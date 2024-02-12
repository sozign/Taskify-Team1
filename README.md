<h1 align="center">우리의 일정관리 Taskify</h1>
<div align="center">
  <img width="1920" alt="pc" src="https://github.com/sozign/codeit-top-secret-X/assets/114739219/bdf445a0-362d-4058-8c29-77e321a62ba2">
  <div><h3>"열심히 살아가는 당신에게 도움이 된다면 좋겠어요"</h3>
    <p>모달 기반 일정 관리 서비스</p>
</div>
 <br/>
  <p>동료들과 함께 일정을 정하고 정리해보아요!</p>
  <p>멤버를 초대해 일정 카드를 만들고, 마감일을 정해 일을 시작해봅시다.</P>
  <p>가끔은 일 뿐만 아니라 맛집이나 일상을 사진에 담아 올리고 댓글로 소통해 보아요 :)</p>
  <br/>
  <a href="https://codeit-top-secret-x.vercel.app/"><p>Taskify로 함께 일정관리 하기👩‍👧‍👦</p></a>
  <a href="https://github.com/sozign/codeit-top-secret-X/wiki"><p>wiki 바로가기🔗</p></a>
</div>

<br/>

# 팀원 소개 & 역할
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Useong0"><img src="width="128px;" alt=""/><br /><sub><b>박운성</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/PJW980921"><img src="" width="128px;" alt=""/><br /><sub><b>박지원</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/sozign"><img src="https://github.com/sozign/codeit-top-secret-X/assets/114739219/328b8ddb-4811-4d44-880c-973e53c92537" width="128px;" alt=""/><br /><sub><b>안소연</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/hyun522"><img src="" width="128px;" alt=""/><br /><sub><b>정현진</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/JIS0098"><img src="https://github.com/sozign/codeit-top-secret-X/assets/114739219/3816c811-e11d-41fa-af8d-dd82a4a4825d" width="128px;" alt=""/><br /><sub><b>한지수</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>


<br>

  ### 박운성<br>
- landing, dashboard/{boardId}/edit Page ui 제작<br>
- 페이지네이션 기반 초대 기록, 구성원 조회 및 삭제 기능 구현<br>
- Modal 관련 공통 컴포넌트 제작<br>
  (Modal Layout, ConfirmModal)
- 컬럼 추가 모달 제작 <br>
- 전체 api, api 관련 type 추가<br>

### 박지원<br>
- login, signup Page ui 제작<br>
- react-hook-form 기반 회원가입, 로그인 기능 구현<br>
- Auth 관련 유효성 검사, debounce 적용<br>
- Auth 관련 동적 에러 메세지 모달 제작<br>
- 각 페이지의 Header 공통 컴포넌트 제작<br>

### 안소연<br>
- 프로젝트 및 레포 셋팅<br>
- 브랜치 전략 문서화<br>
- dashboard/{boardId} Page ui 제작
- 무한스크롤 기반 컬럼 조회 기능 구현
- 카드 추가, 수정 및 멤버 외 접근 제한 모달 제작
- 아바타, 태그 컴포넌트 랜덤한 배경 지정 기능 구현
- react-hook-form 기반 Input, SideBar 공통 컴포넌트 제작 <br>
  (FormInput, TagInput, AuthInput)<br>

### 정현진<br>
- mypage Page ui 제작<br>
- react-hook-form 기반 form 제작<br>
- input 값 기반 버튼 활성화 기능 구현 및 관련 모달 제작<br>
- 프로필 이미지 upload 및 preview 기능 구현

### 한지수<br>
- mydashboard Page  ui 제작<br>
- 페이지네이션 기반 대시보드 조회 기능 구현<br>
- 무한스크롤 기반 초대 조회 및 수락, 거절 및 검색 기능 구현<br>
- 검색 관련 debounce, 로딩ui 적용<br>
- Button, Chip 관련 공통 컴포넌트 제작<br>
- 로딩 관련 커스텀 훅, 로딩 ui 추가<br>

<br>

# 목차
### 1. [프로젝트 소개](#프로젝트-소개)
   + 주요기능
   + 프로젝트 실행방법
### 2. [프로젝트 구성](#프로젝트-구성)
  + 기술 스택
  + Directory 구조

### 3. [트러블 슈팅](#트러블-슈팅)

    
    
<br/>

# 프로젝트 소개
### 일정관리 사이트(Taskify)<br/>
>모달 기반의 초대기능이 있는 일정 관리 서비스를 제공합니다<br>
>제작기간: 2024.01.25-2024.02.13<br>

<br/>

### 1) 주요 기능

**[로그인, 회원가입]**<br>

![로그인](https://github.com/sozign/codeit-top-secret-X/assets/124119421/fe2880eb-acee-4479-a9f4-268992609170)
![회원가입](https://github.com/sozign/codeit-top-secret-X/assets/124119421/d8c94927-80c7-4572-906a-36dc5b64ae44)

<br>

**[대시보드, 초대 관련 기능]**<br>

![대시보드 관련 기능](https://github.com/sozign/codeit-top-secret-X/assets/114739219/16e2c1dc-47f9-43e4-a645-386cc9c18e73)<br>
+ 대시보드 생성 기능
+ 페이지네이션 기반 대시보드 조회 기능
+ 무한스크롤 기반 초대 조회 기능
+ 초대 수락, 거절 및 검색 기능

<br>

**[컬럼, 카드관련 기능]**<br>

![무한 스크롤](https://github.com/sozign/codeit-top-secret-X/assets/148179726/3358b911-8ea1-4451-ae30-665ecc2d5b48)<br/>
+ 무한 스크롤 기반 할 일 카드 조회 기능 <br/>
<br/>

<img  height="220" src="https://github.com/sozign/codeit-top-secret-X/assets/148179726/6bab165d-1cfb-4fa2-9c84-bf893dde2cab" alt="카드 생성/수정">
<img  height="220" src="https://github.com/sozign/codeit-top-secret-X/assets/148179726/2e184940-94c0-421d-8df7-ca4184605022" alt="카드 삭제">

+ 카드 생성, 수정, 삭제 기능<br/>


<br/>

![댓글 작성 및 수정](https://github.com/sozign/codeit-top-secret-X/assets/148179726/616dbffb-caa6-45c9-9178-58fa2caafaa8)<br>
+ 댓글 작성, 수정. 삭제 기능<br/>

<br>

**[접근 권한 제어 관련]**<br>

![미로그인 모달](https://github.com/sozign/codeit-top-secret-X/assets/148179726/585f241d-cd37-4d0f-b080-6b4e6fd3102b) <br/>
![대시보드 주인 아닐때](https://github.com/sozign/codeit-top-secret-X/assets/148179726/ed69058a-f47c-4162-82d4-cbbce61b63fd) <br/>

+ 초대받지 않은 대시보드에 접근하거나 로그인 하지 않은 상태로 페이지에 접근 시 모달<br/>
<br/>

**[계정 관련]**<br>

![계정 프로필 비밀번호 수정](https://github.com/sozign/codeit-top-secret-X/assets/134246845/6a3ed4a3-e4b5-4415-9f83-221a66608d8c)<br/>

+ 프로필 업로드 ,닉네임·비밀번호 수정 기능<br/>

<br/>

**[반응형]**
![반응형2](https://github.com/sozign/codeit-top-secret-X/assets/114739219/d71b5171-6478-40f7-8c7f-54aa103f4b18)<br>
![반응형3](https://github.com/sozign/codeit-top-secret-X/assets/114739219/6bce80ee-c8c8-44ea-bc3e-4fe1cd1c7dbe)






### 2) 실행방법
<pre>
$ git clone git@github.com:sozign/codeit-top-secret-X.git
$ npm install
$ npm run dev
</pre> 
<p>http://localhost:3000 접속</p>

<br>

# 프로젝트 구성
### 1) 기술스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/react--hook--form-663399?style=for-the-badge&logo=react&logoColor=white">

<br>

### 2) Directory 구조
<pre>
src
 ┣ components
 ┃ ┣ common
 ┃ ┃ ┣ Buttons
 ┃ ┃ ┣ Chips
 ┃ ┃ ┣ Headers
 ┃ ┃ ┣ Input
 ┃ ┃ ┣ spinner
 ┃ ┃ ┣ Avatar.tsx
 ┃ ┃ ┣ PageLayout.tsx
 ┃ ┃ ┣ SideBar.tsx
 ┃ ┃ ┗ SideBarPagination.tsx
 ┃ ┣ domains
 ┃ ┃ ┣ dashboard
 ┃ ┃ ┣ edit
 ┃ ┃ ┗ myDashBoard
 ┃ ┣ dropdown
 ┃ ┣ modal
 ┃ ┗ myPage
 ┣ constants
 ┃ ┣ types.ts
 ┃ ┗ validation.ts
 ┣ context
 ┃ ┣ DashboardContext.tsx
 ┃ ┗ UserContext.tsx
 ┣ hooks
 ┃ ┗ useAsync.ts
 ┣ lib
 ┃ ┣ api.ts
 ┃ ┗ axios.ts
 ┣ pages
 ┃ ┣ dashboard
 ┃ ┃ ┗ [boardid]
 ┃ ┃ ┃ ┣ edit.tsx
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┣ login
 ┃ ┃ ┗ index.tsx
 ┃ ┣ mydashboard
 ┃ ┃ ┗ index.tsx
 ┃ ┣ mypage
 ┃ ┃ ┗ index.tsx
 ┃ ┣ signup
 ┃ ┃ ┗ index.tsx
 ┃ ┣ 404.tsx
 ┃ ┣ index.tsx
 ┃ ┣ _app.tsx
 ┃ ┗ _document.tsx
 ┣ styles
 ┃ ┣ font.js
 ┃ ┗ globals.css
 ┗ utils
    ┗ stringToNumber.ts
</pre>
  
<br>


# 트러블 슈팅
  **<a href="https://almond-year-fc3.notion.site/a341c05392924be5a718da02815d1e30">트러블 슈팅 노션 바로가기🛠</a>**
