const crypto = require('crypto');

// La même clé secrète que dans la configuration
const JWT_SECRET = '2241960b994b001e14f9ccc4470d61d83ae0dd7e26287de1d8340e717667cadd';

// Fonction pour générer un token JWT
function generateJWT(payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Test avec un payload simple
const testPayload = {
  document: {
    fileType: 'docx',
    key: 'test-key-' + Date.now(),
    title: 'Test Document',
    url: 'http://example.com/test.docx'
  },
  documentType: 'word',
  editorConfig: {
    mode: 'edit',
    lang: 'fr'
  }
};

// Générer le token
const token = generateJWT(testPayload);
console.log('Token JWT généré :');
console.log(token);
console.log('\nPour tester, copiez ce token et utilisez-le dans votre application.'); 