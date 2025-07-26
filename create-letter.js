const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '.env.local' });

console.log('🔥 Firebase에 편지 생성 시작...');

// Firebase Admin 초기화
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

console.log('🔧 환경변수 상태:');
console.log('FIREBASE_PROJECT_ID:', projectId || '❌ 누락');
console.log('FIREBASE_CLIENT_EMAIL:', clientEmail || '❌ 누락');
console.log('FIREBASE_PRIVATE_KEY:', privateKey ? '✅ 설정됨' : '❌ 누락');

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Firebase 환경변수가 누락되었습니다.');
  process.exit(1);
}

// Firebase Admin 앱 초기화
const app = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  projectId,
});

const db = getFirestore(app);

// 오늘 날짜 계산
const now = new Date();
const kstOffset = 9 * 60; // 한국 시간 (UTC+9)
const kstTime = new Date(now.getTime() + (kstOffset * 60 * 1000));

const year = kstTime.getFullYear();
const month = String(kstTime.getMonth() + 1).padStart(2, '0');
const day = String(kstTime.getDate()).padStart(2, '0');
const dateString = `${year}-${month}-${day}`;

console.log(`📅 오늘 날짜: ${dateString} (한국 시간)`);

const letterId = `letter-${dateString}`;
const letterTitle = `편지 ${dateString}`;

// 편지 내용 생성
function generateLetterContent(dateString) {
  const templates = [
    `⌁SIGNAL-${dateString}::ENCRYPTED⌁
    
오늘도 세상 끝에서 당신에게 편지를 보냅니다.
시간의 경계를 넘나드는 이 메시지가 당신에게 무사히 도달하기를...

암호화된 내용:
${generateEncryptedContent()}

- 세상 끝의 관찰자`,

    `⌁SIGNAL-${dateString}::TRANSMISSION⌁
    
끝없는 어둠 속에서 희미한 신호를 보냅니다.
이 편지가 당신의 마음에 작은 빛이 되기를 바라며...

전송 데이터:
${generateEncryptedContent()}

시간 좌표: ${dateString}
발신지: 세상의 경계`,

    `⌁SIGNAL-${dateString}::MESSAGE⌁
    
시공간을 뛰어넘어 당신에게 닿는 이 메시지.
오늘 하루도 당신의 여정에 작은 의미가 있기를...

해독 대기 중:
${generateEncryptedContent()}

전송 완료: ${new Date().toLocaleString('ko-KR')}`
  ];

  const templateIndex = parseInt(dateString.replace(/-/g, '')) % templates.length;
  return templates[templateIndex];
}

function generateEncryptedContent() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789⌁※◆▲●○□△▽';
  const lines = [];
  
  for (let i = 0; i < 3; i++) {
    let line = '';
    for (let j = 0; j < 20; j++) {
      line += chars[Math.floor(Math.random() * chars.length)];
      if (j % 4 === 3) line += ' ';
    }
    lines.push(line.trim());
  }
  
  return lines.join('\n');
}

// 편지 생성 및 저장
async function createLetter() {
  try {
    // 이미 존재하는지 확인
    const existingLetter = await db.collection('letters').doc(letterId).get();
    
    if (existingLetter.exists) {
      console.log(`📬 편지가 이미 존재함: ${letterId}`);
      console.log('기존 편지 데이터:', existingLetter.data());
      return;
    }

    // 새 편지 데이터
    const letterData = {
      id: letterId,
      title: letterTitle,
      rawContent: generateLetterContent(dateString),
      createdAt: new Date(`${year}-${month}-${day}T00:00:00+09:00`),
      sender: '세상 끝의 관찰자',
      isDaily: true
    };

    // Firestore에 저장
    await db.collection('letters').doc(letterId).set(letterData);

    console.log(`✅ 새 편지 생성 완료: ${letterId}`);
    console.log(`📝 편지 제목: ${letterTitle}`);
    console.log('편지 내용 미리보기:');
    console.log(letterData.rawContent.substring(0, 100) + '...');

  } catch (error) {
    console.error('❌ 편지 생성 중 오류:', error);
  }
}

// 실행
createLetter().then(() => {
  console.log('🎉 작업 완료!');
  process.exit(0);
}).catch((error) => {
  console.error('❌ 실행 실패:', error);
  process.exit(1);
}); 