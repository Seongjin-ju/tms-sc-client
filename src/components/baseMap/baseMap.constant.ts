import { ClusterScale } from "./baseMap.interface";

/** 통합플랫폼 시스템 설정 내 배경지도 설정이 저장된 prop 키 값 */
export const BACKGROUND_MAP = "BACKGROUND_MAP";

/** 통합플랫폼 시스템 설정 내 카카오 클라우드 버전 지도 타입이 저장된 prop 키 값 */
export const KAKAO_CLOUD_BG = "KAKAO_CLOUD_BG";

/** 카카오 기본 지도인 road map hd 버전의 타입이 저장된 prop 키 값 */
export const KAKAO_ROADMAP_HD_TYPE = "ROADMAP_HD";

/** 카카오 sdk 호출을 위한 road view key가 저장된 prop 키 값 */
export const KAKAO_ROADVIEW_KEY = "ROADVIEW_KEY";

/** 지도 생성 기본 설정 */
export const MAP_CONFIG = {
    /** 초기 지도 화면의 중심 좌표 */
    center: [128.41913344169805, 35.27243933575347],
    /** 지도의 최소 줌 레벨 */
    minZoom: 10,
    /** 지도의 최대 줌 레벨 */
    maxZoom: 20,
    /** 초기 지도 화면의 줌 레벨 */
    zoom: 12,
    /** 기본 subLayer, 스타일 처리용 */
    subLayerId: "default",
    /** 지도 위 자산으로 표현되는 icon의 가로 너비, px 단위 */
    iconWidth: 24,
    /** 지도 위 자산으로 표현되는 icon의 세로 높이, px 단위 */
    iconHeight: 24,
};

/** EPSG:4326 화면 표시용 좌표계 */
export const DISPLAY_PROJECTION_NAME = "EPSG:4326";

/** 레이어 관리용 properties key */
export const LAYER_TYPE_KEY = "layerType";

/** 자산 point 선택 용 cluster scale 정의 값 */
export const CLUSTER_SCALE: ClusterScale = {
    "48": 75,
    "40": 90,
    "32": 105,
    "24": 150,
    "16": 265,
    minScale: 533,
};

/** 아이콘 정보가 없을 경우 보여줄 empty icon base64 string */
export const EMPTY_ICON =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjE2cHgiCiAgIGhlaWdodD0iMTZweCIKICAgdmlld0JveD0iMCAwIDE2IDE2IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxMyIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZW1wdHlfaWNvbi5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMSAoYzY4ZTIyYzM4NywgMjAyMS0wNS0yMykiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczE3IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTUiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjOTk5OTk5IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOC4zODQ3NzYiCiAgICAgaW5rc2NhcGU6Y3g9IjE0LjgyMjA0NiIKICAgICBpbmtzY2FwZTpjeT0iNC44NjgxNTgyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE3IgogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmcxMyIgLz4KICA8ZwogICAgIGlkPSJzdXJmYWNlMSI+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2U6IzJhN2ZmZjtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjEwIgogICAgICAgZD0iTSAxMi4wMDE3MDkgMC40OTc2MzIgQyA1LjY1NTQzOSAwLjQ5MTc3NyAwLjUwMzQ4NiA1LjYzMjAyMSAwLjQ5NzYzMiAxMS45NzgyOTEgQyAwLjQ5MTc3NyAxOC4zMjQ1NjEgNS42MzIwMjEgMjMuNDc2NTE0IDExLjk3ODI5MSAyMy40ODIzNjggQyAxOC4zMjQ1NjEgMjMuNDg4MjIzIDIzLjQ3NjUxNCAxOC4zNDc5NzkgMjMuNDgyMzY4IDEyLjAwMTcwOSBDIDIzLjQ4ODIyMyA4Ljk1MTUxOSAyMi4yNzYzNDMgNi4wMjQyNzIgMjAuMTIxODkgMy44Njk4MTkgQyAxNy45NzMyOTEgMS43MDk1MTIgMTUuMDQ2MDQ1IDAuNDk3NjMyIDEyLjAwMTcwOSAwLjQ5NzYzMiBaIE0gMTIuMDAxNzA5IDAuNDk3NjMyICIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuNjY3MjIzLDAsMCwwLjY2NzIyMywwLDApIgogICAgICAgaWQ9InBhdGgyIiAvPgogIDwvZz4KICA8cGF0aAogICAgIGQ9Im0gMTEuNDYwNzU2LDUuNDgzMDg5NSBoIDEuODg3Njg0IGEgMC45NDM4NDEzMiwwLjk0Mzg0MTMyIDAgMCAxIDAuOTQzODQsMC45NDM4NDEgSCAxMS4xNDYxNDQgViA2LjE1MzIxNzIgYSAxLjIyMzg0NzUsMS4yMjM4NDc1IDAgMCAwIC0wLjUzNzk5LDAuMzE0NjEzNSBMIDkuMzE1MDksNy43NjQwMzg5IEEgMS4yNTg0NTUsMS4yNTg0NTUgMCAwIDAgOC45NDM4NDU4LDguNjU0Mzk2NiB2IDEuNzg3MDA1NCBhIDAuOTQzODQxMzIsMC45NDM4NDEzMiAwIDAgMSAwLjMxNDYxNDQsMC43MDQ3MzUgdiAyLjUxNjkxMSBoIDAuOTQzODQwOCBhIDAuMzE0NjE0LDAuMzE0NjE0IDAgMCAxIDAsMC42MjkyMjggSCA1Ljc5NzcwODIgYSAwLjMxNDYxNCwwLjMxNDYxNCAwIDAgMSAwLC0wLjYyOTIyOCBIIDYuNzQxNTQ5NiBWIDExLjE0NjEzNyBBIDAuOTQzODQxMzIsMC45NDM4NDEzMiAwIDAgMSA3LjA1NjE2MzMsMTAuNDQ0NTUgViA4LjY1NDM5NjYgQSAxLjI1ODQ1NSwxLjI1ODQ1NSAwIDAgMCA2LjY4NDkxOTEsNy43NjA4OTI4IEwgNS4zOTE4NTY1LDYuNDY0Njg0NSBBIDEuMjIzODQ3NSwxLjIyMzg0NzUgMCAwIDAgNC44NTM4NjY4LDYuMTUwMDcxIFYgNi40MjY5MzA1IEggMS43MDc3MjkxIEEgMC45NDM4NDEzMiwwLjk0Mzg0MTMyIDAgMCAxIDIuNjUxNTcwNSw1LjQ4MzA4OTUgSCA0LjUzOTI1MzIgQSAxLjgyMTYxMzgsMS44MjE2MTM4IDAgMCAxIDUuODM1NDYxOCw2LjAyMTA3ODcgTCA3LjEzMTY3MDYsNy4zMTQxNDE5IEEgMS44ODc2ODI3LDEuODg3NjgyNyAwIDAgMSA3LjY4NTM5MDksOC42NTQzOTY2IFYgMTAuMjAyMjk2IEggOC4zMTQ2MTg0IFYgOC42NTQzOTY2IEEgMS44ODc2ODI3LDEuODg3NjgyNyAwIDAgMSA4Ljg2ODMzOTEsNy4zMTQxNDE5IEwgMTAuMTY0NTQ4LDYuMDIxMDc4NyBhIDEuODIxNjEzOCwxLjgyMTYxMzggMCAwIDEgMS4yOTYyMDgsLTAuNTM3OTg5MiB6IG0gMC4wMzQ2MSwzLjMxOTE3NTIgLTAuMzE0NjEyLDAuNjI5MjI3OSBhIDAuMzE0NjEzNzcsMC4zMTQ2MTM3NyAwIDEgMCAwLjU2MDAxLDAuMjgzMTUxNyBsIDAuMzE0NjE0LC0wLjYyOTIyNjYgYSAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAwIDAgLTAuNTYwMDEyLC0wLjI4MzE1MyB6IG0gLTkuNDM4NDEyNSwwIC0wLjMxNDYxNDcsMC42MjkyMjc5IEEgMC4zMTQ2MTM3NywwLjMxNDYxMzc3IDAgMSAwIDIuMzAyMzQ5Miw5LjcxNDY0NDMgTCAyLjYxNjk2Myw5LjA4NTQxNzcgQSAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAwIDAgMi4wNTY5NTE0LDguODAyMjY0NyBaIG0gMTEuMzI2MDkzNSwwLjI4MzE1MyAwLjMxNDYxMiwwLjYyOTIyNjYgQSAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAxIDAgMTQuMjU3NjczLDkuNDMxNDkyNiBMIDEzLjk0MzA1OCw4LjgwMjI2NDcgYSAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAwIDAgLTAuNTYwMDExLDAuMjgzMTUzIHogbSAtOS40Mzg0MTM5LDAgMC4zMTQ2MTM3LDAuNjI5MjI2NiBBIDAuMzE0NjEzNzcsMC4zMTQ2MTM3NyAwIDEgMCA0LjgxOTI1OTQsOS40MzE0OTI2IEwgNC41MDQ2NDU2LDguODAyMjY0NyBBIDAuMzE0NjEzNzcsMC4zMTQ2MTM3NyAwIDEgMCAzLjk0NDYzMzEsOS4wODU0MTc3IFogTSAyLjk2NjE4NDMsOC45NDM4NDA2IHYgMC42MjkyMjc5IGEgMC4zMTQ2MTM4LDAuMzE0NjEzOCAwIDAgMCAwLjYyOTIyNzYsMCBWIDguOTQzODQwNiBhIDAuMzE0NjEzOCwwLjMxNDYxMzggMCAwIDAgLTAuNjI5MjI3NiwwIHogbSA5LjQzODQxMjcsMCB2IDAuNjI5MjI3OSBhIDAuMzE0NjEzNzcsMC4zMTQ2MTM3NyAwIDAgMCAwLjYyOTIyNywwIFYgOC45NDM4NDA2IGEgMC4zMTQ2MTM3NywwLjMxNDYxMzc3IDAgMCAwIC0wLjYyOTIyNywwIHogTSAxLjcwNzcyOTEsNy4wNTYxNTg0IEggNC44NTM4NjY4IFYgNy4zNTE4OTQ4IEEgMC45NjI3MTgxNSwwLjk2MjcxODE1IDAgMCAxIDMuODkxMTQ4Nyw4LjMxNDYxMzggSCAyLjY3MDQ0NzMgQSAwLjk2MjcxODE1LDAuOTYyNzE4MTUgMCAwIDEgMS43MDc3MjkxLDcuMzUxODk0OCBaIG0gMTIuNTg0NTUwOSwwIGggLTMuMTQ2MTM2IHYgMC4yOTU3MzY0IGEgMC45NjI3MTgxNSwwLjk2MjcxODE1IDAgMCAwIDAuOTYyNzE2LDAuOTYyNzE5IGggMS4yMjA3MDEgQSAwLjk2MjcxODE1LDAuOTYyNzE4MTUgMCAwIDAgMTQuMjkyMjgsNy4zNTE4OTQ4IFogTSA4LjAwMDAwNDcsMS43MDc3MjM4IGEgMi41MTY5MTAyLDIuNTE2OTEwMiAwIDEgMCAyLjUxNjkxMTMsMi41MTY5MSAyLjUxNjkxMDIsMi41MTY5MTAyIDAgMCAwIC0yLjUxNjkxMTMsLTIuNTE2OTEgeiBtIDAsMy4xNDYxMzc4IEEgMC4zMTQ2MTM3NywwLjMxNDYxMzc3IDAgMSAxIDcuNjg1MzkwOSw1LjE2ODQ3NiAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAwIDEgOC4wMDAwMDQ3LDQuODUzODYxNiBaIE0gNy41ODc4NjA2LDQuNzY1NzY5NCBBIDAuNjI5MjI3NTUsMC42MjkyMjc1NSAwIDAgMSA4LjAwMDAwNDcsNC41MzkyNDczIDAuNjA3MjA0NTgsMC42MDcyMDQ1OCAwIDAgMSA4LjQxMjE0ODcsNC43NTYzMzA5IDAuMzE1OTMyNjUsMC4zMTU5MzI2NSAwIDEgMCA4Ljg1MjYwODMsNC4zMDMyODY3IDEuMjIzODQ3NSwxLjIyMzg0NzUgMCAwIDAgOC4wMDAwMDQ3LDMuOTEwMDE5NCAxLjIzMDEzOTksMS4yMzAxMzk5IDAgMCAwIDcuMTYzMTMyLDQuMzAzMjg2NyAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAwIDAgNy41OTcyOTksNC43NTYzMzA5IFogTSA3LjIyOTIwMDksMy44NTY1MzU4IEEgMS42MDQ1MzA0LDEuNjA0NTMwNCAwIDAgMSA4LjAwMDAwNDcsMy41OTU0MDcxIDEuNjA0NTMwNCwxLjYwNDUzMDQgMCAwIDEgOC43NzA4MDgyLDMuODU2NTM1OCAwLjMxNDYxMzc3LDAuMzE0NjEzNzcgMCAwIDAgOS4xMTY4ODMxLDMuMzM0Mjc3NCAyLjM4NDc3MjMsMi4zODQ3NzIzIDAgMCAwIDguMDAwMDA0NywyLjk2NjE3OTQgMi4zODQ3NzIzLDIuMzg0NzcyMyAwIDAgMCA2Ljg4MzEyNTgsMy4zMzQyNzc0IDAuMzE0NjEzNzcsMC4zMTQ2MTM3NyAwIDAgMCA3LjIyOTIwMDksMy44NTY1MzU4IFoiCiAgICAgZmlsbC1ydWxlPSJldmVub2RkIgogICAgIGlkPSJwYXRoMi03IgogICAgIHN0eWxlPSJmaWxsOiMyYTdmZmY7c3Ryb2tlLXdpZHRoOjAuMzE0NjEyIiAvPgo8L3N2Zz4K";
