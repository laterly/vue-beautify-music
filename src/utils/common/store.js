let globalData=window.globalData||{};
window.globalData=globalData;
export default {
    //储存在window上的数据
    normal:{
        set:(key,value)=>{
            globalData[key]=value;
        },
        get:(key)=>{
            return globalData[key];
        },
        del:(key)=>{
            if(key)
                delete globalData[key];
        },
        clear:()=>{
            globalData={};
        }
    },
    //储存在localStorage 带有时间标记
    local:{
        set(key,value,aliveTime){
            if (key){
                if(aliveTime){
                    value={
                        obj:value,
                        aliveTime:aliveTime,
                        saveTime: new Date().getTime()
                    }
                }
                localStorage[key]=JSON.stringify(value);
            }
        },
        get(key){
            let data;
            try{
                data=JSON.parse(localStorage[key]);
            }catch (e) {
            }
            if (data){
                if(data.aliveTime&&data.saveTime){
                    if(new Date().getTime()-data.saveTime>=data.aliveTime){
                        //超时了
                        this.del(key);
                        return null;
                    }else{
                        return data.obj;
                    }
                }else{
                    return data;
                }
            }
            else
                return null;
        },
        del(key){
            if(key)
                localStorage.removeItem(key);
        },
        clear(){
            localStorage.clear();
        }
    },
    //储存在sessionStorage 不带时间标记
    session:{
        set:(key,value)=>{
            if (key)
                sessionStorage[key]=JSON.stringify(value);
        },
        get:(key)=>{
            let data=sessionStorage[key];
            if (data)
                return JSON.parse(data);
            else
                return null;
        },
        del:(key)=>{
            if(key)
                sessionStorage.removeItem(key);
        },
        clear:()=>{
            sessionStorage.clear();
        }
    }
}
