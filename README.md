# ICT 지원실 민원 처리 프로젝트

## 프로젝트 개요
교내에서 IT 관련 민원을 체계적으로 접수 및 처리하기 위한 웹 어플리케이션입니다.

## 목적
- IT 민원 처리의 효율성 및 반응 속도 향상
- 민원 접수부터 처리까지의 전 과정을 디지털화하여 관리의 용이성 제공

## 사용기술 스택
- React: 사용자 인터페이스 구축
- Redux-Persist: 애플리케이션 상태 관리 및 오프라인 스토리지 활용
- Firebase: 백엔드 서비스 및 데이터베이스 관리
- Axios: HTTP 클라이언트, 백엔드와의 비동기 통신
- Bootstrap & Material-UI: 반응형 디자인 및 UI 컴포넌트 제공
- Recharts: 데이터 시각화
- Sass: CSS 확장 언어, 스타일링 향상

## 구현 기능
- **로그인 / 권한 설정:** 사용자 로그인 및 관리자 권한 설정
- **민원 접수 및 관리:** 민원 접수, 수정, 삭제 및 진행 상태 관리
- **민원 처리:** 민원에 대한 처리 기능 및 상태 업데이트
- **민원 진행 알림:** 사용자에게 민원 진행 상황 알림 제공

## 프로젝트 구조 및 컴포넌트 정리

api
	•	API 관련 함수나 설정 파일을 저장하는 디렉터리.
	•	auth
	•	AuthScreen.js: 인증 화면 구성.
	•	GoogleLogin.js: 구글 로그인 기능.
	•	LoginForm.js: 로그인 폼.
	•	SignupForm.js: 회원가입 폼.
	•	contexts
	•	AuthContext.js: 인증 상태 관리를 위한 Context.
	•	ModalContext.js: 모달 상태 관리를 위한 Context.
	•	DirectMessage
	•	Chat.js: 채팅 기능 구현.
	•	MessageInput.js: 메시지 입력 컴포넌트.
	•	MessageList.js: 메시지 리스트 컴포넌트.
	•	hooks
	•	Modal.js: 모달 관련 커스텀 훅.
	•	useChat.js: 채팅 관련 커스텀 훅.
	•	layout
	•	Footer.js: 웹 페이지의 푸터.
	•	HomeButton.js: 홈 버튼.
	•	Nav.js: 네비게이션 바.
	•	pages
	•	admin: 관리자 관련 페이지들.
	•	AdminMenu.js: 관리자 메뉴.
	•	ComplaintManage.js: 민원 관리 페이지.
	•	ComplaintProcess.js: 민원 처리 페이지.
	•	ComplaintsListManage.js: 민원 목록 관리 페이지.
	•	Dashboard.js: 대시보드 페이지.
	•	complaint: 민원 관련 페이지들.
	•	ComplaintDetail.js: 민원 상세 페이지.
	•	ComplaintForm.js: 민원 등록 폼.
	•	ComplaintFormFirebase.js: Firebase를 이용한 민원 폼.
	•	ComplaintList.js: 민원 목록 페이지.
	•	First.js: 초기 화면.
	•	Home.js: 홈 페이지.
	•	NotFound.js: 404 에러 페이지.
	•	style
	•	스타일 관련 파일들을 저장하는 디렉터리.
	•	test
	•	테스트 코드 관련 파일들을 저장하는 디렉터리.

```
ict_support_front/
├── src/
│   ├── api/
│   ├── auth/
│   │   ├── AuthScreen.js
│   │   ├── GoogleLogin.js
│   │   ├── LoginForm.js
│   │   └── SignupForm.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ModalContext.js
│   ├── DirectMessage/
│   │   ├── Chat.js
│   │   ├── MessageInput.js
│   │   └── MessageList.js
│   ├── hooks/
│   │   ├── Modal.js
│   │   └── useChat.js
│   ├── layout/
│   │   ├── Footer.js
│   │   ├── HomeButton.js
│   │   └── Nav.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminMenu.js
│   │   │   ├── ComplaintManage.js
│   │   │   ├── ComplaintProcess.js
│   │   │   ├── ComplaintsListManage.js
│   │   │   └── Dashboard.js
│   │   ├── complaint/
│   │   │   ├── ComplaintDetail.js
│   │   │   ├── ComplaintForm.js
│   │   │   ├── ComplaintFormFirebase.js
│   │   │   └── ComplaintList.js
│   │   ├── First.js
│   │   ├── Home.js
│   │   └── NotFound.js
│   ├── style/
│   ├── test/
│   ├── App.js
│   ├── firebase.js
│   ├── index.css
│   └── index.js
├── public/
└── README.md
```

## 설치 및 실행 방법
```bash
# 의존성 설치
npm install

# 애플리케이션 실행
npm run start
```

## 의존성 설명
- **@mui/icons-material & @popperjs/core:** UI 컴포넌트 및 툴팁 기능 제공
- **@testing-library:** 컴포넌트의 유닛 테스트 지원
- **axios:** 서버 API와의 비동기 통신
- **bootstrap & react-icons:** UI 디자인 및 아이콘 사용
- **firebase:** 인증, 데이터베이스 관리 및 호스팅
- **react-router-dom:** SPA의 라우팅 관리
- **react-scripts:** 프로젝트 빌드 및 개발 환경 설정 자동화
- **recharts:** 차트 및 데이터 시각화 도구
- **redux-persist:** 앱 상태의 지속성 관리 및 세션 저장
- **sass:** CSS 전처리기, 복잡한 스타일링을 구조적으로 관리

## 프로젝트 배포 URI
[ICT 지원실 민원 처리 시스템](https://ict-support-59ce4.web.app/home)
