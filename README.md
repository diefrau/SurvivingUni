# Campus Survival Map MVP

React Native + Expo + TypeScript 기반의 캠퍼스 생존 지도 MVP입니다. 이번 단계는 실제 지도 API, 서버 DB, 실제 로그인 없이 mock data/service 구조로 Android/Galaxy 실행 가능성과 핵심 UX 흐름을 먼저 검증하는 것을 목표로 합니다.

## 주요 구조

- `App.tsx`: Expo 앱 엔트리와 내비게이션 컨테이너 연결
- `src/navigation`: 홈/지도/저장/제보 탭과 건물별 보기/장소 상세 스택 라우팅
- `src/types/domain.ts`: Data Model 문서의 `Building`, `Spot`, `Tag`, `Favorite`, `Report` 축에 맞춘 MVP 도메인 타입
- `src/data/mockData.ts`: 실제 서버 DB를 대체하는 mock 건물, 장소, 태그, 즐겨찾기, 제보 데이터
- `src/services/campusService.ts`: 추후 실제 API repository로 교체하기 위한 명확한 반환 타입의 service layer
- `src/hooks/useFavorites.ts`: `Favorite` 모델을 Spot 내부 필드와 분리해 AsyncStorage에 저장/해제하는 로컬 hook
- `src/components/SpotCard.tsx`, `EmptyState.tsx`, `ErrorState.tsx`, `LoginPromptModal.tsx`: 장소 탐색/저장/제보 흐름에 필요한 공통 UI

## Android / Galaxy 우선 실행 방법

1. Node.js 20 이상을 준비합니다.
2. 의존성을 설치합니다.

   ```bash
   npm install
   ```

3. Android Emulator 또는 Galaxy 실기기에서 Expo Go / development build 실행 환경을 준비합니다.
4. Android 대상으로 Expo를 실행합니다.

   ```bash
   npm run android
   ```

   또는 Metro 서버만 먼저 실행합니다.

   ```bash
   npm start
   ```

## 검증 명령

```bash
npm run typecheck
```

## npm registry 점검 결과

프로젝트에는 `.npmrc`가 있으며 registry를 npm 공식 registry로 고정하고 audit/fund 자동 호출을 꺼 두었습니다.

현재 작업 환경에서는 `npm_config_http_proxy=http://proxy:8080`, `npm_config_https_proxy=http://proxy:8080` 환경 변수가 주입되어 있고, 해당 프록시가 `https://registry.npmjs.org/*` 요청을 `403 Forbidden`으로 차단합니다. 이 문제는 프로젝트의 `package.json`, `package-lock.json`, `.npmrc` 설정 문제가 아니라 실행 환경의 네트워크/프록시 정책 문제로 확인했습니다.

네트워크가 허용된 로컬/CI 환경에서는 위 실행 방법대로 `npm install` 후 Android 실행을 진행하면 됩니다. 이번 UX 단계에서 로컬 즐겨찾기 저장을 위해 `@react-native-async-storage/async-storage` 의존성을 사용합니다.

## Lint / format 제안

이번 PR에는 대형 lint 설정을 추가하지 않았습니다. 다음 단계에서 최소 설정으로 아래 중 하나를 도입하는 것을 권장합니다.

- Expo 기본 ESLint 템플릿 기반 `npm run lint`
- Prettier 기반 `npm run format:check`
