let walking = null;
export function Walking(params) {
  if (!walking) {
    walking = new AMap.Walking({
      map: params.map,
      hideMarkers: true
    });
  }
  //根据起终点坐标规划步行路线
  walking.search(params.position_start, params.position_end, (status, result) => {
    // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    if (status === 'complete') {
      if (params.complete && typeof params.complete == 'function') {
        params.complete(result) //定位成功
      }
    }else {
      params.error("路线规划失败！");
    }
  });
}
export function distanceConversion(data){
  if(data.toString().length >= 4){
    return `${data / 1000}公里`;
  }else{
    return `${data}米`;
  }
}