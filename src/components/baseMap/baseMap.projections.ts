/** @constant 지도 종류 별 projection 정보 */
export const MAP_PROJECTIONS = {
    kakao: {
        resolution: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
        extent: [-30000, -60000, 494288, 988576],
        projectionName: "EPSG:5181",
        projection:
            "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    },
    baro: {
        resolution: [
            1954.597389, 977.2986945, 488.64934725, 244.324673625, 122.1623368125, 61.08116840625, 30.540584203125,
            15.2702921015625, 7.63514605078125, 3.817573025390625, 1.908786512695313, 0.954393256347656,
            0.477196628173828, 0.238598314086914,
        ],
        extent: [-200000.0, -28024123.62],
        projectionName: "EPSG:5179",
        projection:
            "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    },
};
