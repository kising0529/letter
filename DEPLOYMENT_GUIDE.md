# 🚀 Firebase + Vercel 배포 가이드

## 📋 배포 전 체크리스트

### ✅ **필수 준비사항**
- [ ] Firebase 프로젝트 생성 완료
- [ ] Firebase Authentication 익명 로그인 활성화
- [ ] Firebase Firestore 데이터베이스 생성
- [ ] Vercel 계정 생성 및 GitHub 연동
- [ ] 환경변수 설정 완료
- [ ] 도메인 설정 (선택사항)

## 🔥 Firebase 프로젝트 설정

### **1. Firebase 프로젝트 생성**
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 초기화
firebase init
```

#### **초기화 옵션 선택:**
- ✅ **Firestore**: Database rules and indexes
- ✅ **Hosting**: Configure files for Firebase Hosting
- ❌ Functions, Storage, Emulators (필요시 추가)

### **2. Firebase Authentication 설정**
1. **Firebase Console** → **Authentication** → **Sign-in method**
2. **익명** 로그인 **활성화**
3. **승인된 도메인**에 Vercel 도메인 추가:
   - `your-app.vercel.app`
   - `localhost` (개발용)

### **3. Firestore 데이터베이스 설정**
1. **Firebase Console** → **Firestore Database** → **데이터베이스 만들기**
2. **위치 선택**: `asia-northeast3 (Seoul)`
3. **보안 규칙**: 테스트 모드로 시작 (나중에 프로덕션 규칙 적용)

### **4. Firestore 보안 규칙 배포**
```bash
# 보안 규칙 배포
firebase deploy --only firestore:rules

# 인덱스 배포
firebase deploy --only firestore:indexes
```

## ⚡ Vercel 배포 설정

### **1. GitHub 저장소 연결**
1. **Vercel Dashboard** → **New Project**
2. **GitHub 저장소** 선택
3. **프로젝트 설정**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### **2. 환경변수 설정**
**Vercel Dashboard** → **Settings** → **Environment Variables**

#### **필수 환경변수:**
```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

#### **선택사항 환경변수:**
```bash
VITE_ENVIRONMENT=production
VITE_DEBUG_MODE=false
VITE_ENABLE_AI_FEATURES=true
VITE_OPENAI_API_KEY=your-openai-key (선택사항)
```

### **3. 도메인 설정 (선택사항)**
1. **Vercel Dashboard** → **Settings** → **Domains**
2. **커스텀 도메인** 추가
3. **DNS 설정**:
   - **A 레코드**: `76.76.19.61`
   - **CNAME**: `cname.vercel-dns.com`

## 🔧 환경변수 설정 가이드

### **1. Firebase 설정값 확인**
1. **Firebase Console** → **프로젝트 설정** → **일반**
2. **웹 앱** 섹션에서 **구성** 클릭
3. 설정값 복사:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### **2. 로컬 개발용 .env 파일**
```bash
# .env 파일 생성 (env.example 참고)
cp env.example .env

# 환경변수 입력
nano .env
```

### **3. Vercel 환경변수 설정**
```bash
# Vercel CLI로 환경변수 설정
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
# ... (나머지 변수들)
```

## 🚀 배포 실행

### **1. 로컬 빌드 테스트**
```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm run preview
```

### **2. Vercel 배포**
```bash
# Vercel CLI 설치
npm install -g vercel

# 첫 배포
vercel

# 프로덕션 배포
vercel --prod
```

### **3. Firebase 규칙 배포**
```bash
# Firestore 규칙 및 인덱스 배포
firebase deploy --only firestore

# Firebase Hosting (선택사항)
firebase deploy --only hosting
```

## 🔍 배포 후 확인사항

### **1. 기능 테스트**
- [ ] **페이지 로딩**: 메인 페이지 정상 접근
- [ ] **Firebase 연결**: 콘솔에서 연결 성공 메시지 확인
- [ ] **익명 로그인**: 자동 로그인 동작 확인
- [ ] **편지 해독**: 해독 기능 정상 동작
- [ ] **데이터 저장**: Firestore에 데이터 저장 확인
- [ ] **키워드 추출**: worldArchive 저장 확인

### **2. 성능 확인**
```bash
# Lighthouse 성능 측정
npx lighthouse https://your-app.vercel.app

# 예상 점수:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 90+
# SEO: 85+
```

### **3. 보안 확인**
- [ ] **HTTPS 적용**: 모든 페이지 HTTPS 접근
- [ ] **Firestore 규칙**: 보안 규칙 정상 적용
- [ ] **환경변수**: API 키 등 민감 정보 보호
- [ ] **CORS 설정**: 허용된 도메인만 접근

## 🐛 문제 해결

### **Firebase 연결 오류**
```
ERROR: Firebase configuration error
```
**해결방법:**
1. 환경변수 설정 확인
2. Firebase 프로젝트 ID 일치 확인
3. 브라우저 개발자 도구에서 네트워크 탭 확인

### **Firestore 권한 오류**
```
ERROR: Missing or insufficient permissions
```
**해결방법:**
1. Firestore 규칙 배포 확인: `firebase deploy --only firestore:rules`
2. 익명 로그인 활성화 확인
3. 규칙 시뮬레이터에서 테스트

### **Vercel 빌드 실패**
```
ERROR: Build failed
```
**해결방법:**
1. 환경변수 설정 확인
2. 로컬에서 `npm run build` 테스트
3. Node.js 버전 확인 (18.x 권장)

### **라우팅 404 오류**
```
ERROR: 404 - Page Not Found
```
**해결방법:**
1. `vercel.json` 설정 확인
2. SPA 라우팅 설정 적용
3. `rewrites` 규칙 점검

## 📊 모니터링 및 분석

### **1. Vercel Analytics**
```bash
# Vercel Analytics 활성화
vercel --prod --analytics
```

### **2. Firebase Analytics (선택사항)**
```javascript
// Firebase Analytics 추가
import { getAnalytics } from 'firebase/analytics';
const analytics = getAnalytics(app);
```

### **3. 성능 모니터링**
- **Vercel**: 배포 성능, 함수 실행 시간
- **Firebase**: Firestore 사용량, 인증 사용자 수
- **Google Analytics**: 사용자 행동 분석

## 🔄 CI/CD 자동화

### **GitHub Actions 설정**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 최적화 팁

### **1. 성능 최적화**
- **코드 분할**: React.lazy로 컴포넌트 분할
- **이미지 최적화**: WebP 형식 사용
- **캐싱**: Vercel Edge Cache 활용
- **CDN**: 정적 자산 CDN 배포

### **2. SEO 최적화**
- **메타 태그**: 적절한 title, description 설정
- **오픈 그래프**: 소셜 미디어 공유 최적화
- **사이트맵**: 검색 엔진 크롤링 지원

### **3. 보안 강화**
- **CSP 헤더**: Content Security Policy 설정
- **Rate Limiting**: API 호출 제한
- **입력 검증**: 사용자 입력 데이터 검증

## 🎉 배포 완료!

### **✅ 성공적인 배포 확인**
- 🌐 **웹사이트**: https://your-app.vercel.app
- 🔥 **Firebase Console**: 데이터베이스 활동 확인
- 📊 **Vercel Dashboard**: 배포 상태 및 성능 확인
- 📱 **모바일 테스트**: 다양한 기기에서 접근 테스트

### **🚀 다음 단계**
1. **도메인 연결**: 커스텀 도메인 설정
2. **분석 도구**: Google Analytics, Hotjar 등 추가
3. **A/B 테스트**: 사용자 경험 개선
4. **백업 설정**: 정기적인 데이터 백업
5. **모니터링**: 실시간 오류 추적 설정

**축하합니다! 🎊 React 웹앱이 성공적으로 배포되었습니다!** 