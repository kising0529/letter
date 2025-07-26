# 🌍 세상 끝에서 온 편지

신비로운 편지 해독 게임 - React + TailwindCSS + Firebase로 구현

## 📖 프로젝트 소개

"세상 끝에서 온 편지"는 매일 새로운 암호화된 편지가 도착하는 편지 해독 게임입니다. 
사용자는 단서를 입력하여 편지를 해독하고, 그 기록을 보관함에서 확인할 수 있습니다.

## ✨ 주요 기능

### 🌌 배경 효과 (BackgroundEffect)
- **몰입감 있는 배경**: 별빛 파티클과 떠다니는 기하학적 요소들
- **다층 애니메이션**: 점, 별, 도형들이 각각 다른 속도로 움직임
- **광선 효과**: 화면을 가로지르는 빛의 선들
- **성능 최적화**: 모바일 디바이스에서 파티클 수 자동 감소
- **접근성 고려**: 모션 감소 설정 시 애니메이션 비활성화
- **전역 적용**: 모든 페이지에서 일관된 배경 효과

### 🎬 인트로 화면 (IntroScreen)
- **몰입감 있는 시작**: "SIGNAL INCOMING..." 타이핑 효과
- **시각적 효과**: 노이즈 오버레이, 스캔라인 애니메이션
- **신호 상태 표시**: 신호 강도 바, 연결 진행률 표시
- **자동 전환**: 3초 후 LetterViewer로 자동 전환
- **UI 제어**: 인트로 중 네비게이션/입력창/버튼 숨김
- **페이드 효과**: 부드러운 fade-in/fade-out 전환

### 📜 오늘의 편지 (LetterViewer)
- Firestore에서 오늘 날짜의 편지 데이터 로드
- **타자기 효과**: 편지 본문이 한 글자씩 타이핑되어 표시 (사운드 포함)
- **단계별 UI 제어**: 
  - 편지 수신 중: 입력창/버튼 비활성화, 진행 상태 표시
  - 수신 완료 후: 해독 섹션 활성화
- 해독 단서 입력창과 해독 버튼
- localAI.ts의 decodeMessage() 함수를 통한 편지 해독
- 해독 결과 자동 저장 및 성공 알림
- "해독 결과가 보관함에 저장되었습니다" 메시지 표시

### 📚 보관함 (Archive)
- 사용자가 해독한 모든 편지 기록 표시
- Firestore의 'decodedLetters' 컬렉션에서 데이터 로드
- 해독 정확도에 따른 등급 시스템 (S~D등급)
- 편지별 상세 정보 모달
- 해독 날짜별 정렬

### 🗺️ 스토리 맵 (StoryPage + StoryMap)
- **전용 페이지**: "당신이 밝힌 진실의 지도" 타이틀과 함께 전체 화면 구성
- **통합 네비게이션**: 상단에 [오늘의 편지] [보관함] [스토리 맵] 내비게이션 바
- **시각적 진행도**: 해독한 편지들을 노드로 연결하여 스토리 흐름 표시
- **반응형 레이아웃**: 데스크톱(지그재그), 모바일(직선) 배치
- **애니메이션 효과**: Framer Motion을 활용한 노드 등장 및 연결선 애니메이션
- **진행도 표시**: 전체 스토리 대비 해독 완료 퍼센트
- **상세 모달**: 노드 클릭 시 편지 상세 정보 표시
- **호버 효과**: 편지 제목과 해독 날짜 미리보기
- **몰입감 있는 UI**: `h-screen overflow-auto`로 전체 화면 활용
- **스토리 분기 시스템**: 챕터, 태그, 키 이벤트 기반 시각적 구분
- **태그별 색상**: 북극기지, 연구소, 지하벙커 등 위치별 고유 테마
- **키 이벤트 강조**: 중요한 스토리 포인트에 특별한 애니메이션 효과
- **챕터 잠금 시스템**: 해독한 편지 수에 따라 단계적으로 챕터 해제
- **진행도 추적**: 실시간 챕터 진행 상황과 다음 목표 표시
- **접근 제한**: 잠금된 챕터의 편지는 해독 불가, 해제 조건 안내

### 📖 편지 보관소 (ChaptersPage + ChapterViewer)
- **전용 페이지**: "진실에 가까워지려면, 하나씩 해독해보세요" 타이틀과 함께 전체 화면 구성
- **통합 네비게이션**: 상단에 [오늘의 편지] [보관함] [편지 보관소] [스토리 맵] 내비게이션 바
- **챕터별 분류**: 모든 편지를 챕터별로 그룹화하여 체계적으로 표시
- **해독 상태 표시**: 각 편지의 해독 완료 여부를 시각적으로 구분
- **잠금 시스템**: 잠금된 챕터의 편지는 흐릿하게 표시하고 클릭 불가
- **편지 선택**: 클릭 시 해당 편지의 상세 페이지로 이동
- **진행도 추적**: 챕터별 편지 수와 해독 완료 수 표시
- **태그 시스템**: 편지의 위치/테마별 태그를 색상으로 구분
- **키 이벤트 강조**: 중요한 스토리 포인트에 별표 표시
- **몰입감 있는 UI**: `h-screen overflow-auto`로 전체 화면 활용, 어두운 우주 배경
- **사용자 안내**: 하단에 편지 클릭 방법과 잠금 해제 조건 안내

## 🛠️ 기술 스택

- **Frontend**: React 18, TailwindCSS
- **Database**: Firebase Firestore
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Animation**: Framer Motion
  - **특수 컴포넌트**:
    - LetterTyper (타자기 효과)
    - IntroScreen (인트로 화면)
    - useTypeSound (사운드 훅)
    - IndexPage (메인 페이지 + 인트로 제어)
    - IntroProvider (인트로 상태 관리)
    - BackgroundEffect (몰입감 배경 애니메이션)
    - StoryMap (시각적 스토리 진행도 맵)
    - StoryPage (스토리 맵 전용 페이지)
    - ChaptersPage (편지 보관소 전용 페이지)
    - ChapterViewer (챕터별 편지 보관소 컴포넌트)
    - StoryMetadata (스토리 분기 및 태그 시스템)
    - useUnlockedChapters (챕터 잠금 해제 시스템 훅)

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Ollama 설치 및 설정
로컬 AI 모델을 사용하기 위해 Ollama를 설치하고 설정하세요:

```bash
# Ollama 설치 (macOS/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Windows의 경우 https://ollama.ai에서 다운로드

# Mistral 모델 다운로드
ollama pull mistral

# Ollama 서버 실행 (기본 포트: 11434)
ollama serve
```

### 3. Firebase 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 설정을 추가하세요:

```bash
# .env.local 파일 생성
touch .env.local
```

`.env.local` 파일 내용:
```bash
# Firebase 설정
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Firebase Emulator 설정 (개발 환경, 선택사항)
VITE_USE_FIREBASE_EMULATOR=false
VITE_FIREBASE_EMULATOR_HOST=localhost
VITE_FIREBASE_EMULATOR_PORT=8080
```

> **주의**: `.env.local` 파일은 Git에 커밋하지 마세요. 이미 `.gitignore`에 포함되어 있습니다.

### 4. Firestore 컬렉션 구조

#### `letters` 컬렉션 (편지 원본)
```typescript
{
  id: "letter001",              // string - 사용자 정의 ID
  title: "편지 제목",           // string
  rawContent: "암호화된 편지 내용", // string
  createdAt: Timestamp          // Timestamp - 날짜별 구분
}
```

#### `decodedLetters` 컬렉션 (사용자 해석 기록)
```typescript
{
  userId: "anonymous",          // string - 사용자 ID
  letterId: "letter001",        // string - 원본 편지 ID
  letterTitle: "편지 제목",     // string
  decodedText: "해독된 텍스트", // string
  decodedAt: Timestamp          // Timestamp - 해독 시간
}
```

#### 테스트 편지 생성
개발 환경에서 브라우저 콘솔을 통해 테스트 편지를 생성할 수 있습니다:

```javascript
// 기본 테스트 편지 5개 생성 (2025-01-20 ~ 2025-01-24)
generateTestLetters()

// 오늘부터 5일간의 테스트 편지 생성
generateTestLettersFromToday()

// 특정 날짜부터 5일간의 테스트 편지 생성
generateTestLettersFromDate(new Date('2025-01-15'))
```

#### 해독 결과 저장 테스트
브라우저 콘솔에서 해독 결과 저장을 테스트할 수 있습니다:

```javascript
// 기본 해독 결과 저장
await saveDecodedLetter(
  'letter001', 
  '편지 #001 - 빛이 꺼진 곳에서', 
  '북극지대는 인간이 마지막으로 숨은 곳이었다...'
)

// 유효성 검증과 함께 안전한 저장
await saveDecodedLetterSafely(
  'letter002', 
  '편지 #002 - 메모리 파편들', 
  '기억의 조각들이 흩어져있다...'
)

// 사용자 ID와 함께 저장
await saveDecodedLetterWithUser(
  'letter003', 
  '편지 #003 - 잃어버린 주파수', 
  '신호가 약해지고 있다...', 
  'user123'
)
```

#### 자동 샘플 데이터 생성
개발 환경에서 샘플 데이터를 자동 생성하려면 `.env.local`에 추가:
```bash
VITE_AUTO_CREATE_SAMPLE_DATA=true
```

### 5. 개발 서버 실행
```bash
npm run dev
```

애플리케이션이 `http://localhost:3000`에서 실행됩니다.

### 6. 빌드
```bash
npm run build
```

## 🎮 사용 방법

1. **오늘의 편지 페이지**에서 암호화된 편지를 확인합니다
2. 해독 단서를 입력하고 "편지 해독하기" 버튼을 클릭합니다
3. AI가 편지를 해독하여 결과를 보여줍니다
4. **보관함 페이지**에서 해독한 편지들의 기록을 확인할 수 있습니다

## 🔧 커스터마이징

### Firebase Emulator 사용 (개발 환경)
로컬에서 Firebase Emulator를 사용하려면:

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 프로젝트 초기화
firebase init emulators

# Emulator 실행
firebase emulators:start

# .env.local에서 Emulator 활성화
VITE_USE_FIREBASE_EMULATOR=true
```

### AI 해독 로직 수정
`src/utils/localAI.ts` 파일에서 Ollama 모델 설정을 변경할 수 있습니다:

```typescript
// 다른 모델 사용 (예: llama2, codellama 등)
body: JSON.stringify({
  model: 'llama2', // 모델명 변경
  prompt: `다음 텍스트를 해독하고 의미를 분석해주세요: "${prompt}"`,
  stream: false
})

// 서버 주소 변경
const response = await fetch('http://your-server:11434/api/generate', {
  // ...
});
```

### 스타일 테마 변경
`tailwind.config.js` 파일에서 색상 테마를 수정할 수 있습니다:

```javascript
colors: {
  'letter-brown': '#8B4513',
  'letter-cream': '#F5F5DC', 
  'letter-gold': '#DAA520'
}
```

## 📝 라이센스

MIT License

## 🤝 기여

버그 리포트나 기능 제안은 언제든 환영합니다!

---

### 🎵 타자기 사운드 효과 (선택사항)
타자기 효과에 사운드를 추가하려면 `public/typewriter.mp3` 파일을 추가하세요:

#### 1. LetterTyper 컴포넌트에서 사용
```javascript
<LetterTyper
  text={letterContent}
  enableSound={true}
  typingSpeed={TypingSpeed.NORMAL}
/>
```

#### 2. useTypeSound 훅 직접 사용
```javascript
import useTypeSound, { SoundPresets } from './hooks/useTypeSound';

const MyComponent = () => {
  const typeSound = useTypeSound('/typewriter.mp3', SoundPresets.NORMAL, 50);

  const handleKeyPress = () => {
    typeSound.play(); // 한 글자 타이핑 사운드 재생
  };

  return (
    <button onClick={handleKeyPress}>
      타이핑 사운드 테스트
    </button>
  );
};
```

#### 3. 브라우저 콘솔에서 테스트
```javascript
// 사운드 파일 테스트
testTypeSound().test()

// 커스텀 사운드 파일 테스트
testTypeSound('/custom-sound.mp3').test()
```

**추천 사운드**: 타자기 키보드 소리 또는 터미널 타이핑 사운드

**사운드 프리셋**:
- `SoundPresets.QUIET` (0.05)
- `SoundPresets.NORMAL` (0.1) - 기본값
- `SoundPresets.LOUD` (0.2)
- `SoundPresets.VERY_LOUD` (0.3)

---

**Made with ❤️ for letter decoding enthusiasts** 