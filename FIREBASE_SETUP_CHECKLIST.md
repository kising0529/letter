# 🔥 Firebase 설정 체크리스트

## 📋 1단계: Firebase 프로젝트 생성

### **Firebase Console에서 진행**
1. **https://console.firebase.google.com** 접속
2. **"프로젝트 추가"** 클릭
3. **프로젝트 이름** 입력: `signal-from-end` (또는 원하는 이름)
4. **Google Analytics** 설정 (선택사항)
5. **프로젝트 생성** 완료

## 📋 2단계: 웹 앱 등록

### **Firebase Console > 프로젝트 설정**
1. **"웹 앱 추가"** (</> 아이콘) 클릭
2. **앱 닉네임** 입력: `세상 끝에서 온 편지`
3. **Firebase Hosting 설정** 체크 (선택사항)
4. **앱 등록** 클릭

### **Firebase 구성 정보 복사**
```javascript
// 이런 형태의 설정이 표시됩니다
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "signal-from-end.firebaseapp.com",
  projectId: "signal-from-end",
  storageBucket: "signal-from-end.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## 📋 3단계: Authentication 설정

### **Firebase Console > Authentication**
1. **"시작하기"** 클릭
2. **"Sign-in method"** 탭 선택
3. **"익명"** 로그인 활성화:
   - **익명** 클릭 → **사용 설정** → **저장**

### **승인된 도메인 추가**
1. **"Settings"** 탭 → **승인된 도메인**
2. 다음 도메인들 추가:
   - `localhost` (개발용)
   - `your-app.vercel.app` (배포용)

## 📋 4단계: Firestore 데이터베이스 설정

### **Firebase Console > Firestore Database**
1. **"데이터베이스 만들기"** 클릭
2. **보안 규칙** 선택:
   - **테스트 모드에서 시작** (임시)
   - 나중에 프로덕션 규칙 적용
3. **위치 선택**: `asia-northeast3 (Seoul)`
4. **완료** 클릭

## 📋 5단계: 환경변수 설정

### **프로젝트 루트에 .env.local 파일 생성**
```bash
# Firebase 설정 (위에서 복사한 실제 값으로 교체)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=signal-from-end.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=signal-from-end
VITE_FIREBASE_STORAGE_BUCKET=signal-from-end.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# 개발 환경 설정
VITE_USE_FIREBASE_EMULATOR=false
VITE_DEBUG_MODE=true
VITE_ENVIRONMENT=development
```

## 📋 6단계: 연결 테스트

### **개발 서버 실행**
```bash
npm run dev
```

### **브라우저 개발자 도구에서 확인**
1. **F12** → **Console** 탭
2. 다음 메시지들이 표시되는지 확인:
   ```
   ✅ Firebase 연결 성공
   📊 프로젝트 ID: signal-from-end
   🌍 환경: 개발
   ```

## 📋 7단계: 기능 테스트

### **익명 로그인 테스트**
1. 웹앱 접속
2. 자동으로 익명 로그인 수행
3. **Firebase Console > Authentication > Users**에서 사용자 확인

### **Firestore 연결 테스트**
1. 편지 해독 기능 사용
2. **Firebase Console > Firestore > 데이터**에서 저장된 데이터 확인

## 🚨 문제 해결

### **"Firebase configuration error" 오류**
- 환경변수 설정 확인
- `.env.local` 파일 위치 확인 (프로젝트 루트)
- 개발 서버 재시작

### **"Missing or insufficient permissions" 오류**
- Firestore 규칙 확인
- 익명 로그인 활성화 확인

### **"Network request failed" 오류**
- 인터넷 연결 확인
- Firebase 프로젝트 상태 확인

## ✅ 완료 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] 웹 앱 등록 및 구성 정보 복사
- [ ] Authentication 익명 로그인 활성화
- [ ] Firestore 데이터베이스 생성
- [ ] .env.local 파일 설정
- [ ] 개발 서버에서 연결 테스트
- [ ] 익명 로그인 동작 확인
- [ ] Firestore 데이터 저장 확인

**모든 단계가 완료되면 Firebase 연동이 성공적으로 완료됩니다!** 🎉 