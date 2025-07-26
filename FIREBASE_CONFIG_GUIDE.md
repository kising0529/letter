# 🔥 Firebase 설정키 받는 방법 (상세 가이드)

## 📋 1단계: Firebase Console 접속

### **1. Firebase Console 접속**
1. 브라우저에서 **https://console.firebase.google.com** 접속
2. **Google 계정으로 로그인** (Gmail 계정 사용)

### **2. 새 프로젝트 생성**
1. **"프로젝트 추가"** 버튼 클릭
2. **프로젝트 이름** 입력: 
   - 예시: `signal-from-end` 또는 `세상끝편지`
   - 영문 권장 (한글 가능하지만 URL에 영향)
3. **계속** 클릭

### **3. Google Analytics 설정 (선택사항)**
1. **"이 프로젝트에 Google Analytics 사용 설정"** 체크박스
   - ✅ **체크 권장**: 사용자 분석에 도움
   - ❌ **체크 해제**: 단순한 설정 원할 때
2. **계속** 클릭

### **4. Analytics 계정 선택 (Analytics 활성화한 경우)**
1. **"기본 계정 (Default Account for Firebase)"** 선택
2. **프로젝트 만들기** 클릭
3. **프로젝트 준비 완료까지 대기** (1-2분)

## 📋 2단계: 웹 앱 등록 및 설정키 받기

### **1. 웹 앱 추가**
1. Firebase 프로젝트 메인 화면에서 **웹 아이콘 (</>) 클릭**
   ```
   💡 화면에 다음과 같은 아이콘들이 보입니다:
   📱 iOS    🤖 Android    🌐 웹    ⚙️ Unity
   ```
2. **웹 앱 아이콘 (</>) 클릭**

### **2. 앱 등록 정보 입력**
1. **앱 닉네임** 입력:
   ```
   세상 끝에서 온 편지
   ```
2. **Firebase Hosting 설정** 체크박스:
   - ✅ **체크**: Firebase Hosting도 함께 사용할 경우
   - ❌ **체크 해제**: Vercel만 사용할 경우 (권장)
3. **앱 등록** 클릭

### **3. Firebase SDK 추가 화면에서 설정키 복사**
등록 완료 후 다음과 같은 화면이 나타납니다:

```javascript
// Firebase SDK 추가 및 초기화
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "signal-from-end.firebaseapp.com",
  projectId: "signal-from-end",
  storageBucket: "signal-from-end.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

### **4. 설정값 의미 설명**

| 설정키 | 설명 | 예시 |
|--------|------|------|
| **apiKey** | Firebase API 접근 키 | `AIzaSyC7xxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **authDomain** | 인증 도메인 | `signal-from-end.firebaseapp.com` |
| **projectId** | 프로젝트 고유 ID | `signal-from-end` |
| **storageBucket** | 파일 저장소 주소 | `signal-from-end.appspot.com` |
| **messagingSenderId** | 메시징 센더 ID | `123456789012` |
| **appId** | 앱 고유 식별자 | `1:123456789012:web:abcdef1234567890abcdef` |
| **measurementId** | Analytics ID (선택) | `G-XXXXXXXXXX` |

## 📋 3단계: 나중에 설정키 다시 찾는 방법

### **방법 1: 프로젝트 설정에서 찾기**
1. **Firebase Console** → **프로젝트 선택**
2. **⚙️ 프로젝트 설정** (왼쪽 메뉴 하단)
3. **일반** 탭 → **내 앱** 섹션
4. **웹 앱** 선택 → **구성** 클릭
5. 설정 정보 복사

### **방법 2: 앱 관리에서 찾기**
1. **Firebase Console** → **프로젝트 선택**
2. **⚙️ 프로젝트 설정** → **일반** 탭
3. 하단 **SDK 설정 및 구성** 섹션
4. **구성** 라디오 버튼 선택
5. 코드 복사

## 📋 4단계: .env.local 파일에 설정 적용

### **1. 프로젝트 루트에 .env.local 파일 생성**
```bash
# 터미널에서 프로젝트 루트 디렉토리로 이동 후
touch .env.local
```

### **2. 환경변수 형식으로 변환**
**Firebase에서 받은 설정:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC7xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "signal-from-end.firebaseapp.com",
  projectId: "signal-from-end",
  storageBucket: "signal-from-end.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

**↓ 변환 ↓**

**.env.local 파일에 입력할 내용:**
```bash
# Firebase 설정 (실제 값으로 교체)
VITE_FIREBASE_API_KEY=AIzaSyC7xxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=signal-from-end.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=signal-from-end
VITE_FIREBASE_STORAGE_BUCKET=signal-from-end.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef

# 개발 환경 설정
VITE_USE_FIREBASE_EMULATOR=false
VITE_DEBUG_MODE=true
```

### **3. 변환 규칙**
| Firebase 설정 | 환경변수 이름 | 주의사항 |
|---------------|---------------|----------|
| `apiKey` | `VITE_FIREBASE_API_KEY` | 따옴표 제거 |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` | 따옴표 제거 |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` | 따옴표 제거 |
| `storageBucket` | `VITE_FIREBASE_STORAGE_BUCKET` | 따옴표 제거 |
| `messagingSenderId` | `VITE_FIREBASE_MESSAGING_SENDER_ID` | 따옴표 제거 |
| `appId` | `VITE_FIREBASE_APP_ID` | 따옴표 제거 |

## 📋 5단계: 실제 예시 (가상의 프로젝트)

### **Firebase Console에서 받은 설정:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBdGcJ7K2vX9mNpQrStUvWxYz123456789",
  authDomain: "my-letter-game.firebaseapp.com",
  projectId: "my-letter-game",
  storageBucket: "my-letter-game.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abc123def456ghi789jkl"
};
```

### **.env.local 파일 내용:**
```bash
# Firebase 설정
VITE_FIREBASE_API_KEY=AIzaSyBdGcJ7K2vX9mNpQrStUvWxYz123456789
VITE_FIREBASE_AUTH_DOMAIN=my-letter-game.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-letter-game
VITE_FIREBASE_STORAGE_BUCKET=my-letter-game.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:abc123def456ghi789jkl

# 개발 환경 설정
VITE_USE_FIREBASE_EMULATOR=false
VITE_DEBUG_MODE=true
VITE_ENVIRONMENT=development
```

## 🚨 주의사항 및 보안

### **1. 환경변수 보안**
- ✅ **`.env.local`** 파일은 Git에 커밋하지 않음 (`.gitignore`에 포함)
- ✅ **API Key는 공개되어도 상대적으로 안전** (Firebase 보안 규칙으로 보호)
- ❌ **절대로 서버 API Key나 Private Key는 클라이언트에 노출하지 않음**

### **2. 파일 위치 확인**
```
your-project/
├── src/
├── public/
├── package.json
├── .env.local          ← 여기에 생성!
└── README.md
```

### **3. 환경변수 적용 확인**
개발 서버 재시작 후 브라우저 개발자 도구에서:
```javascript
// 콘솔에서 확인
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// 결과: "AIzaSyBdGcJ7K2vX9mNpQrStUvWxYz123456789"
```

## 🔧 문제 해결

### **"Firebase configuration error" 오류**
1. **환경변수 이름 확인**: `VITE_` 접두사 사용했는지
2. **파일 위치 확인**: 프로젝트 루트에 `.env.local` 있는지
3. **개발 서버 재시작**: `npm run dev` 다시 실행
4. **따옴표 제거**: 환경변수 값에 따옴표 없이 입력

### **"Project not found" 오류**
1. **프로젝트 ID 확인**: Firebase Console에서 정확한 ID 복사
2. **오타 확인**: 대소문자, 하이픈(-) 정확히 입력

### **"API key not valid" 오류**
1. **API Key 재확인**: Firebase Console에서 다시 복사
2. **공백 제거**: 복사 시 앞뒤 공백 제거
3. **특수문자 확인**: 모든 문자 정확히 복사

## ✅ 설정 완료 확인

환경변수 설정이 완료되면:
1. **개발 서버 실행**: `npm run dev`
2. **브라우저 개발자 도구 확인**:
   ```
   ✅ Firebase 연결 성공
   📊 프로젝트 ID: your-project-id
   🌍 환경: 개발
   ```
3. **Firebase Console > Authentication**에서 익명 사용자 생성 확인

**이제 Firebase 연동이 완료되었습니다!** 🎉 