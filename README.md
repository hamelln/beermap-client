# BeerMap

# Why this project

**BeerMap은 이동중에도 맛난 브루어리를 쉽게 찾고 싶다는 개인적인 바람에서 시작했습니다.  
사용자는 이 서비스에서 주소나 매장 이름을 검색해서 브루어리 정보를 찾을 수 있습니다.**

# Screenshots

![Frame 34](https://github.com/hamelln/beermap-client/assets/39308313/545364d9-ec5e-4f52-bf23-1c6964c41d08)

# Live Demo

**[사이트로 이동](https://beermap.vercel.app/)**

# Skills & Tools

![canvas_architecture-231007_1653](https://github.com/hamelln/beermap-client/assets/39308313/85070e90-4bd9-48d4-a950-f70680bdb75a)

# Service Flow

![canvas_service-flow-231007_1651](https://github.com/hamelln/beermap-client/assets/39308313/824bfd72-edcf-4a7f-973a-1a0b81689ccb)

# Challenges & Solutions

### 모바일의 모달 상호작용

[문제]
- 모바일 기기에서는 사용자가 뒤로 가기 버튼으로 모달 창을 닫는 경우가 많은데 이는 데스크탑과 사뭇 다릅니다. 이에 대처를 안 해서 뒤로 가기로 페이지 이동 시 화면이 고정되거나 기능이 멈추는 side effect가 발생했습니다.
- 게다가 dialog는 열리기 전에도 내부 컴포넌트를 렌더링하므로 리소스를 소모합니다. 지도 API 요청 낭비를 유발할 뿐더러, API가 위치를 중심을 잘못 잡고 렌더링하는 side effect도 발생합니다.

[접근]
- 처음엔 상태관리로 dialog를 활성화, 비활성화하는 방식을 사용했지만, 상태 변경의 비동기적 실행 순서가 dialog의 원활한 작동을 방해했습니다.
- 상태로 모달을 여닫는 대신 라우터로 URI를 인식해서 모달을 여닫도록 변경하고, 모달이 열릴 때에만 내부 컴포넌트가 렌더링되도록 바꿔 해결했습니다.

### FCP 개선

[문제]
- 기존에는 상세 페이지 탐색 시간이 3초를 초과했습니다. 이는 사용 경험을 매우 저하시키는 요소입니다.

[접근]
- 캐러셀의 첫 번째 이미지는 브루어리의 외관으로 고정하도록 패턴화하고 배포 서버에 static하게 저장했다가 응답하도록 바꿨습니다.
- 이미지들을 WebP로 경량화하고 Cloudinary를 통해 더 최적화한 이미지를 가져오도록 변경했습니다.
- 바로 보이지 않을 이미지는 lazy loading을 적용했습니다.
- SSR 방식에서 ISR 방식으로 변경했습니다. 현재는 회원 가입, 리뷰 작성 등의 기능을 지원하지 않기 때문에 SSR로 구현할 필요가 없다고 판단했습니다.
- 이를 통해 FCP를 3초 대에서 1초 대로 단축했습니다.

### 선 개발, 후 테스트

[문제]
- 테스트는 빠르면 좋지만, 늦어도 해야 합니다. BeerMap은 가볍게 시작했지만 2개월 차에 접어들자 테스트가 필요하다고 판단했습니다.

[접근]
- Jest: 컴포넌트 구조가 의존성이 많은지, 경계에 대한 처리를 했는지(검색어 길이를 무한대로 허용하는지, 검색어가 없을 때 어떻게 할지 등) 파악하고 대처할 수 있었습니다.
- Storybook: 컴포넌트의 UI를 독립적으로 보고 의도한 바와 다르게 렌더링되는지 금방 확인할 수 있었습니다.
- Cypress: 서비스를 켜고 직접 모든 기능을 사용하고 검사하는 과정을 자동화했습니다.
- MSW: Storybook과 Jest 동시에 mocking을 지원할 뿐더러, fetch API mocking, Stub 준비에 들어가는 비용을 좀 더 절감할 수 있었습니다.

### 크로스 브라우징 대처

[문제]
- 크로스 브라우징을 확인하기 위해 일일이 다른 환경으로 체크하는 것은 비용이 많이 소모됩니다.

[접근]
- ResponsivelyApp은 여러 환경에서 동시에 실행함으로 크로스 브라우징을 빠르게 점검합니다.
- 일부 구형 iPhone에서 Cloudinary가 auto 설정으로 제공하는 이미지의 확장자를 로드하지 못하는 현상을 일찍 발견하고 수정했습니다.

# Key Learnings & Insights

### 트레이드 오프
> 1. 지도 API 변경: 구글맵 API는 사용이 편하지만 무료 사용량이 적고, 네이버 지도 API는 사용이 불편하지만 무료 사용량이 매우 많습니다. 처음에는 구글맵 API를 사용했지만, 현재는 네이버 지도 API로 변경했습니다. 길찾기 기능도 네이버를 사용하기 때문에 일관성을 유지하기 좋다고 판단했습니다.
> 2. 테스트 도입: 테스트를 도입하지 않아도 기능은 정상적으로 작동했습니다. 테스트가 익숙하지 않아 테스트 환경 설정에도 시간이 걸렸습니다. 사용해본 적 없는 Storybook과 Cypress를 도입하는 것도 고민이 들었지만, 각 테스트는 그만한 학습 비용을 낼 가치가 충분하다고 느꼈고, 테스트를 안 할 때에는 놓쳤던 구조적 문제(의존성, 경계) 등을 금방 찾을 수 있었을 뿐더러 코드에 대한 자신감도 높아졌습니다.
> 3. 타입스크립트 학습: 처음에는 프로젝트에 간단한 타이핑만 하되 타입 에러를 구글링해서 해결했습니다. 이런 임시 방편으론 타입스크립트를 쓰는 의미가 희미하다고 판단했고, 매주 목요일 밤에 시간을 내서 스터디를 하며 타입스크립트 코드를 리팩토링합니다.

### 사용자 피드백
> 주기적으로 주변 사람들에게 사용 피드백을 부탁했고, 만드는 데에 수고가 들었던 바텀 시트를 모달로 교체하는 등 중요한 UX 결정을 내릴 수 있었습니다.

### 코드 품질
> 매일 청소하듯이 작은 리팩토링을 하며 가독성이 좋은 코드, 커밋, 작문을 학습중입니다.

### 관점의 확장
> 백엔드 개발과 디자인을 겸했고, 서버 측 HTTP 통신에 대한 이해, 웹 표준에 따른 UI/UX 학습 등을 통해 프론트엔드에만 국한됐던 관점이 좀 더 넓어졌습니다.

### 테스트 고찰
> "무엇을 테스트할 것인가?" 이러한 질문은 코드를 구조적으로, 다각도로 접근하도록 만듭니다.  
특히 사용자의 동작에 초점을 맞춰서 테스트하되, 테스트 코드 또한 가독성을 좋게 만들어야겠다는 생각을 다시금 했습니다.

# Code Conventions

- Magic number 금지. 의미있는 변수 사용.
- boolean형 식별자는 is, has, are 등의 접두사 붙이기.
- 식별자 이름은 길더라도 구체적이고 의미가 명료하기.
- 함수는 작게 작성.(하나의 함수가 여러 동작을 실행 X)
- 함수 로직이 다르면 다른 패턴으로 작명.
예: HTTP 요청으로 데이터를 가져오면 fetchData, 다른 방법으로 가져오면 getData.
- typing은 자동 추론이 미흡할 경우에 작성.
- type, interface 이름은 간결하게.
예: Brewery
- 컴포넌트 이름은 자세하게.
예: BreweryDetails

# Changelog

## 2023/10

![Static Badge](https://img.shields.io/badge/Fix-d63031)
- 상세 페이지 접속이 안 되는 에러 수정 (개발용 MSW 코드를 배포 서버에서 실행하는 탓에 리소스를 못 찾았음)

![Static Badge](https://img.shields.io/badge/Change-6c757d)
- UI 테스트, 통합 테스트, E2E 테스트 추가
- CI 추가
- 검색 페이지 가로 너비 치우침 수정
- 검색 페이지 검색어 길이 30자로 제한

## 2023/9

![Static Badge](https://img.shields.io/badge/Fix-d63031)  
- 상세 페이지에서 뒤로 가기를 해도 이전 페이지로 넘어가지 않는 현상 수정  
  - 뒤로 가기 외의 방법으로 모달창을 닫으면 history가 추가된 상태로 닫혔기 때문  
→ 어떤 방법으로 모달을 닫아도 history.back
- 상세 페이지 조회가 안 되는 현상 수정  
  - 로딩 페이지가 public 이미지 경로를 못 찾아서 그 경로를 params.id로 전달, 서버는 잘못된 경로를 조회했기 때문  
→ 이미지 경로 맞게 조정
- 캐러셀의 실제 사진 갯수가 표시되는 숫자보다 하나 많은 현상 수정  
  - 캐러셀의 첫 번째 이미지는 public에서 가져오는 정적 이미지라서 images.length에 포함이 안 됐기 때문문  
→ images.length + 1

![Static Badge](https://img.shields.io/badge/Improvement-007bff)  
- 줄바꿈 로직을 white-space:pre-line으로 수정 
  - 코드 길이, 로직 간소화

![Static Badge](https://img.shields.io/badge/Change-6c757d)  
- 파비콘 추가, 로딩 이미지와 상세 페이지 이미지 비율 동기화
- 로고 스타일, 캐러셀 이미지 비율, 설명글 행간 조정
- 다크 모드 설명글 명도 조정

## 2023/8

![Static Badge](https://img.shields.io/badge/New-00b894)  
- 브루어리 이미지 추가 (Clouninary)
- 지도 줌인, 줌아웃 추가
- 구글 → 네이버 지도로 변경
- 길찾기, 브루어리 한 줄 소개 추가

![Static Badge](https://img.shields.io/badge/Fix-d63031)  
- 줌 버튼 오작동 수정  
  - 버튼 클릭에 대해서만 state로 조정해서 맵 터치에 대한 처리가 없었기 때문  
→ API에서 지원하는 줌 버튼으로 변경
- 검색 페이지에서 뒤로 갈 시 가끔 검색 결과가 복구되지 않던 현상 수정  
  - 뒤로 돌아올 시 세션 스토리지 값을 로드하고 읽은 뒤 바로 지웠는데, 적용이 안 될 때가 있기 때문  
→ 세션 스토리지 값을 지우지 않도록 변경
- 바텀시트 삭제  
  - 사용자 모두가 불편을 느낌  
→ 주소 클릭 시 지도 표시


![Static Badge](https://img.shields.io/badge/Improvement-007bff)  
- 모달이 열릴 때에만 자식 컴포넌트 렌더링하도록 변경  
  - 모달이 열리기 전에도 렌더링하면 리소스 낭비 + 지도가 잘못 표시되는 오류가 있었기 때문
- useModal을 공용 로직으로 개량  
  - 지도, 영업 시간을 모달에 담아서 뒤로 가기로 닫게 하려는 목적
- 모달을 state 대신 URI 쿼리 인식으로 여닫도록 변경  
  - 모바일 환경은 뒤로 가기 버튼으로도 모달을 닫을 수 있어야 하기 때문
- Cloudinary에서 최적화한 이미지 가져오도록 변경


![Static Badge](https://img.shields.io/badge/Change-6c757d)  
- 영업 시간 닫기 버튼 스타일 수정, 정보 텍스트 행간 수정, 이미지 화질 수정
- 모바일 디바이스 별에 맞춰서 이미지 요청하도록 변경
- 내 위치 찾기 클릭 시 초점이 안 맞는 현상 수정
- 글자 줄바꿈 적용
- axios → fetch, SSR → ISR로 변경
- 메인 페이지를 검색 페이지로 변경
  - 기존의 메인 페이지가 아무 역할이 없었음
- 상세 페이지 요소 간 margin 조정

## [0.2.1] - 2022-08-24 

## [0.2.1] - 2022-08-09

![Static Badge](https://img.shields.io/badge/Fix-d63031) 콘솔 에러 수정: BOM을 읽기 전에 로컬 스토리지 호출했기 때문  
→ useEffect에서 호출하도록 변경  
![Static Badge](https://img.shields.io/badge/Fix-d63031) 영업 시간 모달이 안 열리는 현상 수정: state로 모달 컴포넌트를 여는 것과 dialog[open]의 실행 순서가 꼬였기 때문  
→ dialog 자체 로직으로만 여닫도록 변경  
![Static Badge](https://img.shields.io/badge/Improvement-007bff) 상세 페이지에서 모달 로직 분리: 가독성을 위함 + 재사용 가능성이 보였음  
![Static Badge](https://img.shields.io/badge/Improvement-007bff) 이미지 경량화, 바로 안 보이는 이미지는 lazy loading: 로딩 시간 2초 가량 단축  
![Static Badge](https://img.shields.io/badge/Change-6c757d) 검색어가 없을 땐 모든 리스트를 표시하도록 변경  
![Static Badge](https://img.shields.io/badge/Change-6c757d) 로딩 스피너 삭제: 로딩 시간이 애매해서 보기 불편

## [0.2.0] - 2022-08-02
![Static Badge](https://img.shields.io/badge/New-00b894) 구글 지도 추가  
![Static Badge](https://img.shields.io/badge/New-00b894) 바텀 시트 추가: 위로 올리면 구글 지도 표시  
![Static Badge](https://img.shields.io/badge/New-00b894) 주소 복사 기능 추가  
![Static Badge](https://img.shields.io/badge/New-00b894) 다른 영업 시간 시간 확인 기능 추가  
![Static Badge](https://img.shields.io/badge/Fix-d63031) 주소 복사 애니메이션 중첩 수정: useDebounce로 마지막 애니메이션만 처리하도록 변경  
![Static Badge](https://img.shields.io/badge/Fix-d63031) 콘솔 에러 수정: 세션 스토리지에서 값이 없을 때에도 읽으려 해서 발생한 문제  
![Static Badge](https://img.shields.io/badge/Change-6c757d) 캐러셀 좌상단 화살표 부분 배경 어둡게 조정  
![Static Badge](https://img.shields.io/badge/Change-6c757d) 리스트 아이템 별 구분선 추가, 캐러셀 좌우 버튼 삭제, 아이콘 추가, 상세 영업 시간은 클릭 시에만 활성화  

## [0.1.0] - 2022-07-28

![Static Badge](https://img.shields.io/badge/New-00b894)  상세 페이지, 캐러셀, 아이콘 추가 및 디자인 수정, 검색 결과 캐시 기능 추가  
![Static Badge](https://img.shields.io/badge/Change-6c757d)  검색 페이지, 검색 결과 스타일 수정, normalize.css 적용

# Future Plans
- 데스크탑 호환성
- 브루어리 추천
- 회원 가입
- 맥주 설명 방식 업데이트
