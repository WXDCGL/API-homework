$(function(){
    $.ajax({
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?Authorization=CWB-DAD220DD-D426-4724-84CB-C819CEEE4726&locationName=%E6%B0%B8%E5%92%8C%E5%8D%80,%E4%B8%AD%E5%92%8C%E5%8D%80&elementName=T",
        // 要請求的 URL，這是一個天氣資料的 API
        type: "GET",
        // 請求的方法為 GET
        dataType: "json",
        // 回傳的資料類型為 JSON
        success: function(resource){
            // 當請求成功時執行此函式，並將回傳的資料存在 resource 參數中

            //找資料
            // console.log(resource);
            // console.log(resource.records.locations[0]);
            // console.log(resource.records.locations[0].location[0].locationName);

            let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            // 宣告一個包含星期幾的陣列

            let j = 0;
            // 設定一個計數器 j，用於追蹤目前是第幾個區塊

            $("#city_name").html(resource.records.locations[0].locationsName);
            // 在 id 為 "city_name" 的元素中填入資料

            $('#district').html(resource.records.locations[0].location[0].locationName);
            // 在 id 為 "district" 的元素中填入資料

            $('#tempture').html(resource.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value+"&#176;");
            // 在 id 為 "tempture" 的元素中填入溫度資料

            for(let i = 0; i < 10; i++){
                // 迴圈 10 次，用於填入未來 5 天的溫度資料

                //找資料
                // console.log($(".block").eq(i).find("small").html());
                // console.log($(".block").eq(i).find("h6").html());

                if((i % 2) == 0){
                    // 如果 i 是偶數，表示這是星期幾的資料

                    let T = resource.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value+"&#176;";
                    // 從資料中取得溫度資料

                    let tempture = `<strong>${T}</strong>`;
                    // 用溫度資料建立一個 HTML 字串

                    let wd = resource.records.locations[0].location[0].weatherElement[0].time[i].startTime;
                    // 取得星期幾的時間

                    $(".block").eq(j).find("h6").html(tempture);
                    // 在第 j 個區塊中的 h6 標籤中填入溫度資料

                    const d = new Date(wd);
                    // 建立一個 Date 物件，使用星期幾的時間

                    let day_index = d.getDay();
                    // 取得星期幾的索引值

                    $(".block").eq(j).find("small").html(weekday[day_index]);
                    // 在第 j 個區塊中的 small 標籤中填入星期幾的資料

                    j++;
                    // j 加一，表示下一個區塊
                }
            }
        },
        error: function(error){
            // 當請求失敗時執行此函式，並將錯誤資訊存在 error 參數中
            console.log(error);
        }
    })
})
