/** 스마트 횡단 보도 이벤트 목록 조회 데이터 */
export const smartCrossWarkEventsData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(10)
            .fill(0)
            .map((_, index) => {
                return {
                    uid: `${_}${index}`,
                    reg_date: "2023-09-15",
                    reg_time: "10:09:54",
                    event_name: `보행자주의 이벤트_${new Date()}`,
                    place_name: "엄사중앙로 사거리A",
                    camera_name: "CCTV(01)-차량검지,CCTV(02)-보행자검지,",
                };
            }),
        count: 10,
        totalCount: 175,
    },
};

/** 스마트 횡단 보도 개소 조회 데이터 */
export const smartCrossWarkPlaceData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(15)
            .fill(0)
            .map((_, index) => {
                return {
                    place_id: `${_}${index}`,
                    place_name: `엄사중앙로 사거리 ${_}${index}`,
                };
            }),
        totalCount: 15,
    },
};

/** 스마트 횡단 보도 일 별 이벤트 조회 데이터 */
export const smartCrossWarkDailyEventsData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(10)
            .fill(0)
            .map(() => {
                return {
                    reg_date: "2023-09-15",
                    reg_time: "10:09:54",
                    event_name: `보행자주의 이벤트_${new Date()}`,
                };
            }),
        totalCount: 175,
    },
};
