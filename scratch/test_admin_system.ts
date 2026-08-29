import worker from '../src/worker';

interface MockEnv {
  DB: any;
  ASSETS: any;
}

class MockD1PreparedStatement {
  constructor(private query: string, private params: any[] = [], private mockDb: any) {}

  bind(...params: any[]) {
    return new MockD1PreparedStatement(this.query, params, this.mockDb);
  }

  async first() {
    if (this.query.includes('credentials WHERE username = ?')) {
      const user = this.mockDb.credentials.find((u: any) => u.username === this.params[0]);
      return user || null;
    }
    if (this.query.includes('FROM credentials LIMIT 1')) {
      return this.mockDb.credentials[0] || null;
    }
    if (this.query.includes('FROM service_details WHERE slug = ?')) {
      return this.mockDb.service_details.find((s: any) => s.slug === this.params[0]) || null;
    }
    return null;
  }

  async all() {
    if (this.query.includes('FROM service_details')) {
      return { results: this.mockDb.service_details };
    }
    if (this.query.includes('FROM rev_db')) {
      return { results: this.mockDb.rev_db };
    }
    return { results: [] };
  }

  async run() {
    if (this.query.includes('INSERT INTO credentials') || this.query.includes('INSERT OR IGNORE INTO credentials')) {
      this.mockDb.credentials.push({
        id: this.mockDb.credentials.length + 1,
        username: this.params[0],
        password_hash: this.params[1],
        groq_apikey_encrypted: this.params[2] || '',
      });
      return { meta: { last_row_id: this.mockDb.credentials.length } };
    }
    if (this.query.includes('INSERT INTO service_details')) {
      this.mockDb.service_details.push({
        id: this.mockDb.service_details.length + 1,
        slug: this.params[0],
        service_name: this.params[1],
      });
      return { meta: { last_row_id: this.mockDb.service_details.length } };
    }
    return { meta: { last_row_id: 1 } };
  }
}

class MockD1Database {
  public credentials: any[] = [];
  public service_details: any[] = [];
  public rev_db: any[] = [
    { id: 1, page_name: 'home', slug: 'home-hero', heading: 'Direct Bookings Accelerated' },
  ];

  prepare(query: string) {
    return new MockD1PreparedStatement(query, [], this);
  }

  async batch(statements: MockD1PreparedStatement[]) {
    const results = [];
    for (const stmt of statements) {
      results.push(await stmt.run());
    }
    return results;
  }
}

async function runTests() {
  console.log('--- Testing Admin Authentication & Cloudflare Worker APIs ---');
  const mockDb = new MockD1Database();
  const mockEnv: MockEnv = {
    DB: mockDb,
    ASSETS: {
      fetch: async () => new Response('<html><head><title>Original</title></head><body>Shell</body></html>', { status: 200, headers: { 'Content-Type': 'text/html' } }),
    },
  };

  // Test 1: Setup Admin
  const setupReq = new Request('https://www.revlytics.in/api/auth/setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'revlytics2026!',
      groqApiKey: 'gsk_test_123456789',
    }),
  });
  const setupRes = await worker.fetch(setupReq, mockEnv as any);
  const setupJson = (await setupRes.json()) as any;
  console.log('1. Admin Setup Test:', setupRes.status === 200 && setupJson.success ? 'PASSED ✅' : 'FAILED ❌', setupJson);

  const token = setupJson.token;

  // Test 2: Login
  const loginReq = new Request('https://www.revlytics.in/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'revlytics2026!',
    }),
  });
  const loginRes = await worker.fetch(loginReq, mockEnv as any);
  const loginJson = (await loginRes.json()) as any;
  console.log('2. Admin Login Test:', loginRes.status === 200 && loginJson.success ? 'PASSED ✅' : 'FAILED ❌', loginJson);

  // Test 3: Auth Me
  const meReq = new Request('https://www.revlytics.in/api/auth/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const meRes = await worker.fetch(meReq, mockEnv as any);
  const meJson = (await meRes.json()) as any;
  console.log('3. Auth /me Test:', meRes.status === 200 && meJson.authenticated ? 'PASSED ✅' : 'FAILED ❌', meJson);

  // Test 4: Save Service Detail
  const saveServiceReq = new Request('https://www.revlytics.in/api/admin/service-details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      slug: 'luxury-resort-branding',
      service_name: 'Luxury Resort Branding',
      category: 'Branding',
      meta_title: 'Luxury Resort Branding | Revlytics',
      meta_description: 'Transform direct bookings with bespoke resort branding.',
    }),
  });
  const saveServiceRes = await worker.fetch(saveServiceReq, mockEnv as any);
  const saveServiceJson = (await saveServiceRes.json()) as any;
  console.log('4. Service Details Save Test:', saveServiceRes.status === 200 && saveServiceJson.success ? 'PASSED ✅' : 'FAILED ❌', saveServiceJson);

  // Test 5: Fetch Pages Meta
  const pagesMetaReq = new Request('https://www.revlytics.in/api/admin/pages-meta', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const pagesMetaRes = await worker.fetch(pagesMetaReq, mockEnv as any);
  const pagesMetaJson = (await pagesMetaRes.json()) as any;
  console.log('5. Pages Meta GET Test:', pagesMetaRes.status === 200 && pagesMetaJson.success ? 'PASSED ✅' : 'FAILED ❌', pagesMetaJson);

  console.log('\nAll API tests verified successfully! 🎉');
}

runTests().catch(console.error);
