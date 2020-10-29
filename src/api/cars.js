import service from "../utils/request";
/**
 * 根据停车场获取车辆信息
 */
export function GetCarsList(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/cars/`,
        data
    })
}