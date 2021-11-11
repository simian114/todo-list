<p align="middle"><img src="https://github.com/simian114/todo-list/actions/workflows/deploy-production.yml/badge.svg" /></p>
<p align="middle" >
  <img width="200px;" src="https://raw.githubusercontent.com/simian114/gitbook/master/.gitbook/assets/todo.png"/>
</p>
<h1 align="middle"><a href="https://todo-sanam.web.app/" target="_blank">투두리스트</a></h1> 
<p align="middle">쉽고 간편한 그러나 강력한 투두리스트!!</p>
<p align="middle">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white" />
</p>

# 개요

투두리스트를 사용하면 아래의 기능을 경험할 수 있습니다.

1. 소셜계정으로 회원가입 & 로그인을 간편하게 할 수 있다.
2. `Drag & Drop` 으로  **투두의 상태와 정렬 순서를 변경할 수 있다.**
3. **투두의 마감날짜, 카테고리, 우선순위를 지정할 수 있다.**
4. **투두** 에 체크리스트를 만들 수 있고, `Progress UI` 를 통해 체크리스트의 진행 상황을 확인할 수 있다

# 사용 예

[wiki에서 확인 해주세요!](https://github.com/simian114/wanted-preOnBoarding-project10/wiki/%EC%82%AC%EC%9A%A9-%EC%98%88%EC%8B%9C)

# 실행방법
1. 배포되어있는 사이트를 이용할 경우

   1. [링크](https://todo-sanam.web.app/) 에 접속합니다. 소셜 계정으로 간편하게 회원가입 & 로그인을 합니다.
   2. **투두**를 **만들고**, **실천**합니다.

2. 개인사이트로 배포할 경우 (파이어베이스 셋업이 필요합니다.)
   1. `git clone https://github.com/simian114/wanted-preOnBoarding-project10.git`

   2. `npm install` && `npm install -g firebase-tools`

   3. 파이어베이스에서 사용할 환경변수 작성(`.env` 에 작성해주면 됨)

      ```
      REACT_APP_API_KEY=...
      REACT_APP_AUTH_DOMAIN=...
      REACT_APP_PROJECT_ID=...
      REACT_APP_STORAGE_BUCKET=...
      REACT_APP_MESSAGING_SENDER_ID=...
      REACT_APP_APP_ID=...
      REACT_APP_MEASUREMENT_ID=...
      REACT_APP_DATABASE_URL=...
      ```

   4. `firebase init`

      - `functions` 와 `firestore` 를 체크하고 진행해줍니다. 만약 배포를 파이어베이스 호스팅으로 할 경우 `hosting` 까지 체크해줍니다.
      - 프로젝트폴더를 파이어베이스 프로젝트로 만들어줍니다.

   5. `firebase deploy` 

      - `functions` 의 함수와 `firestore` 의 규칙을 클라우드에 올리고  `hosting` 배포 를 진행합니다.

   6. 배포

      - 각 배포 환경에 따라 환경변수 등록 과정이 다르므로 알맞은 방법을 통해 등록해줍시다.

# 업데이트 내역

- 1.0.0
  - 배포
- 1.1.0
  - 파이어베이스 웹소켓 연결
  - 비동기 작업 에러 핸들링

# 기여 방법

[풀리퀘스트](https://github.com/simian114/todo-list/pulls) 또는 [ISSUE](https://github.com/simian114/todo-list/issues)를 작성해주세요!

