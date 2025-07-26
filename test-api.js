// 로컬에서 API 함수 테스트를 위한 스크립트
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules에서 __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env.local 파일 로드
config({ path: path.join(__dirname, '.env.local') });

// API 함수 import
import handler from './api/scheduledLetter.ts';

// 모의 request/response 객체 생성
const mockReq = {
  method: 'GET',
  headers: {
    'user-agent': 'test-script'
  }
};

const mockRes = {
  setHeader: (key, value) => {
    console.log(`Header: ${key} = ${value}`);
  },
  status: (code) => {
    console.log(`Status: ${code}`);
    return mockRes;
  },
  json: (data) => {
    console.log('Response:', JSON.stringify(data, null, 2));
    return mockRes;
  },
  end: () => {
    console.log('Response ended');
    return mockRes;
  }
};

console.log('🧪 API 함수 테스트 시작...');
console.log('📅 현재 시간:', new Date().toISOString());

// 환경변수 확인
console.log('\n🔧 환경변수 상태:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID || '❌ 누락');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL || '❌ 누락');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ 설정됨' : '❌ 누락');

// API 함수 실행
try {
  await handler(mockReq, mockRes);
  console.log('\n✅ API 함수 실행 완료');
} catch (error) {
  console.error('\n❌ API 함수 실행 실패:', error);
} 