# tms-sc-client

> 통합플랫폼 모니터링 및 데이터현황 표출 용 sc-client 프로젝트 예제 보일러 플레이트<br />
> KeyCloak(SSO), React, Recoil, React-Query, OpenLayers(map), msw(data mocking) 적용<br />
> 지도 표시를 위해서는 백엔드 dms-gis-service (proxy)가 필요하다. (맵 타일 레이어 제공)<br />

<br />

# Yarn Berry 관련 설정

해당 라이브러리의 패키지 매니저는 yarn berry(v2)로 개발을 위해 아래와 같이 yarn을 설치 하며, 개발준비를 위한 설치를 진행 한다.

```typescript
// global yarn 설치
npm install -g yarn
// yarn 설치 확인 (버전)
yarn --version

// 패키지 설치
yarn install

// vscode 진입 후 설치 해야 하며, 알림창 발생 시 허용 처리를 한다. Yarn berry의 Pnp 기능 사용을 때, TypeScript가 정상적으로 작동하도록 추가적인 구성
yarn dlx @yarnpkg/sdks vscode

// typescript plugin 설치
yarn plugin import typescript

// 빌드 실행, build:watch 실행 시, gis 모듈의 변경 실시간 빌드 되어 적용 된다.
yarn build:watch

/**
 * yarn 패키지 초기화 & 재설치 방법
 * yarn clean cache 실행 시, 폴더 내 .yarn 에 캐시되어 있는 패키지들이 삭제 되며,
 * yarn install 을 통해 초기화 된다.
 */
yarn clean cache
yarn install
```

<br />

# 파일 구조

해당 프로젝트의 파일 구조

```typescript
📦tms-gyeryong-sc-client
 ┣ 📂.vscode // vscode 셋팅 파일
 ┣ 📂.yarn   // yarn 패키지 및 종속성과 관련된 메타데이터, 캐시파일 저장
 ┣ 📂node_modules // npm 패키지 모듈 정보
 ┣ 📂public // 정적 파일을 담고 있는 dir
 ┃ ┣ 📜favicon.ico // site favicon
 ┃ ┗ 📜mockServiceWorker.js // msw 처리를 위한 service worker 파일
 ┣ 📂src
 ┃ ┣ 📂components // 프로젝트 컴포넌트 파일 모음
 ┃ ┃ ┣ 📂baseMap  // openLayers base 지도 컴포넌트 디렉토리
 ┃ ┃ ┃ ┣ 📜baseMap.api.ts  // map 에서 사용하는 api 처리 용도
 ┃ ┃ ┃ ┣ 📜baseMap.constant.ts // map 에서 사용하는 상수 모음
 ┃ ┃ ┃ ┣ 📜baseMap.interface.ts // map 에서 사용하는 type, interface 정의
 ┃ ┃ ┃ ┣ 📜baseMap.layer.ts // map 위에 생성되는 레이어 처리 함수 모음
 ┃ ┃ ┃ ┣ 📜baseMap.projections.ts // map 좌표계 설정 상수
 ┃ ┃ ┃ ┣ 📜BaseMap.tsx // base map 컴포넌트 tsx 파일
 ┃ ┃ ┃ ┗ 📜baseMap.utils.ts // map 에서 사용하는 기타 기능 함수 모음
 ┃ ┃ ┣ 📜CommonButton.tsx // 공통 버튼 컴포넌트
 ┃ ┃ ┣ 📜CommonChart.tsx // 공통 차트 컴포넌트 (echarts 예정)
 ┃ ┃ ┣ 📜CommonSelect.tsx // 공통 select box 컴포넌트
 ┃ ┃ ┣ 📜DataChartSearch.tsx  // 데이터현황 차트 상단 검색 컴포넌트
 ┃ ┃ ┣ 📜DataTable.tsx // 공통 table 컴포넌트
 ┃ ┃ ┣ 📜DataTablePagination.tsx // 공통 table 하위 pagination 컴포넌트
 ┃ ┃ ┣ 📜DataTableSearch.tsx // 데이터현황 table 상단 검색 컴포넌트 (기간 검색 포함)
 ┃ ┃ ┣ 📜Loading.tsx // 공통 loading 처리 컴포넌트 clip loader (react-spinners)
 ┃ ┃ ┗ 📜PageSubTitle.tsx // page 내 소제목 처리 컴포넌트
 ┃ ┣ 📂constants // 상수 모음 폴더
 ┃ ┃ ┣ 📜common.constant.ts // 프로젝트 내 공통 상수
 ┃ ┃ ┣ 📜smartBusInfo.constant.ts // 스마트 버스정보 관련 상수
 ┃ ┃ ┗ 📜smartCrossWalk.constant.ts // 스마트 횡단보도 관련 상수
 ┃ ┣ 📂msw // data mocking 처리를 위한 msw 설정 폴더
 ┃ ┃ ┣ 📂smartCrossWark
 ┃ ┃ ┃ ┗ 📜smartCrossWark.data.ts
 ┃ ┃ ┣ 📜browser.ts
 ┃ ┃ ┗ 📜handler.ts
 ┃ ┣ 📂pages // 각 메뉴가 될 페이지 컴포넌트 모음
 ┃ ┃ ┣ 📂smartBusInfoPages
 ┃ ┃ ┃ ┣ 📂dataStatus
 ┃ ┃ ┃ ┃ ┗ 📜SmartBusInfoDataStatusPage.tsx
 ┃ ┃ ┃ ┣ 📂equipMgmt
 ┃ ┃ ┃ ┃ ┗ 📜SmartBusInfoEquipMgmtPage.tsx
 ┃ ┃ ┃ ┣ 📂monitoring
 ┃ ┃ ┃ ┃ ┗ 📜SmartBusInfoMonitoringPage.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂smartCrossWalkPages
 ┃ ┃ ┃ ┣ 📂dataStatus
 ┃ ┃ ┃ ┃ ┗ 📜SmartCrossWalkDataStatusPage.tsx
 ┃ ┃ ┃ ┣ 📂equipMgmt
 ┃ ┃ ┃ ┃ ┗ 📜SmartCrossWalkEquipMgmtPage.tsx
 ┃ ┃ ┃ ┣ 📂monitoring
 ┃ ┃ ┃ ┃ ┗ 📜SmartCrossWalkMonitoringPage.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂smartFineDustPages
 ┃ ┃ ┃ ┣ 📂dataStatus
 ┃ ┃ ┃ ┃ ┗ 📜SmartFineDustDataStatusPage.tsx
 ┃ ┃ ┃ ┣ 📂equipMgmt
 ┃ ┃ ┃ ┃ ┗ 📜SmartFineDustEquipMgmtPage.tsx
 ┃ ┃ ┃ ┣ 📂monitoring
 ┃ ┃ ┃ ┃ ┗ 📜SmartFineDustMonitoringPage.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📂smartSafeRoadPages
 ┃ ┃ ┃ ┣ 📂dataStatus
 ┃ ┃ ┃ ┃ ┗ 📜SmartSafeRoadDataStatusPage.tsx
 ┃ ┃ ┃ ┣ 📂equipMgmt
 ┃ ┃ ┃ ┃ ┗ 📜SmartSafeRoadEquipMgmtPage.tsx
 ┃ ┃ ┃ ┣ 📂monitoring
 ┃ ┃ ┃ ┃ ┗ 📜SmartSafeRoadMonitoringPage.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂router // 기본 router 처리를 위한 router 폴더
 ┃ ┃ ┣ 📜Root.tsx
 ┃ ┃ ┣ 📜Router.tsx
 ┃ ┃ ┣ 📜RouterMenus.tsx
 ┃ ┃ ┗ 📜TempMenus.tsx
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📂api // http api 통신 처리를 위한 폴더
 ┃ ┃ ┃ ┣ 📜common.ts
 ┃ ┃ ┃ ┣ 📜init.api.ts
 ┃ ┃ ┃ ┗ 📜smartCrossWark.api.ts
 ┃ ┃ ┣ 📂interfaces // 각종 type interface 정의를 위한 폴더
 ┃ ┃ ┃ ┣ 📜common.interface.ts
 ┃ ┃ ┃ ┣ 📜http.interface.ts
 ┃ ┃ ┃ ┣ 📜init.api.interface.ts
 ┃ ┃ ┃ ┗ 📜smartCrossWark.interface.ts
 ┃ ┃ ┗ 📂state // 전역 state를 관리하기 위한 폴더 (recoil)
 ┃ ┃ ┃ ┣ 📜baseMap.state.ts
 ┃ ┃ ┃ ┣ 📜keycloak.state.ts
 ┃ ┃ ┃ ┗ 📜table.state.ts
 ┃ ┣ 📂styles // style 정의를 위한 폴더(styled-component)
 ┃ ┃ ┣ 📜global.style.ts // css 초기화 및 전역 스타일 설정
 ┃ ┃ ┣ 📜page.style.ts
 ┃ ┃ ┗ 📜table.style.ts
 ┃ ┣ 📂types // type definition 정의
 ┃ ┃ ┗ 📜kakao.d.ts
 ┃ ┣ 📜AuthChecker.tsx // keycloak 인증을 위한 auth 체크용 컴포넌트
 ┃ ┣ 📜main.tsx // 프로젝트 진입점 main
 ┃ ┗ 📜vite-env.d.ts // vite 환경 변수 type defintion 정의
 ┣ 📜.editorconfig
 ┣ 📜.env.development // 개발용 환경 변수
 ┣ 📜.env.production  // 배포용 환경 변수
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore // yarn berry zero install 설정 추가
 ┣ 📜.pnp.cjs
 ┣ 📜.pnp.loader.mjs
 ┣ 📜.prettierrc
 ┣ 📜.yarnrc.yml // zero install 을 위한 nodeLinker: pnp 설정 추가
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜vite.config.ts // vite 번들러 설정 파일
 ┗ 📜yarn.lock
```
