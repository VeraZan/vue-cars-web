import store from "@/store";
/** 省市区街道 */
export function address(value){
  let address = value;
  let addressInfo = "";
  if(address) {
    let split = address.split(",");
    addressInfo += split[0];
    // 街道
    if(split[1]) {
      addressInfo += `<br/>${split[1]}`
    }
  }
  return addressInfo;
}