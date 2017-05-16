﻿function setValue() {
    var id = GetQueryString("id");
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "/Api/System/GetSSSJ?deviceCode=" + id+"&dType=1",
        success: function (result) {
            var data = eval('(' + result + ')');
            if (!data) {
                data = [];
            }
            // 设备名称
            $("#deviceName").html(data.DEVICEROW[0].DEVICENAME);
            // 观测时间
            if (data.ShuiZhi) {
               
                $("#guanceshijian").html("观测时间：" + data.ShuiZhi.DATETIME.replace(/T/, ' ').replace('.000Z', ''));//data.ShuiZhi.DATETIME
            } else {
                $("#guanceshijian").html("观测时间：--");
            }
            setEcology(data.ShuiZhi, data.BiaoZhun);
            setBaoJingXianShi(data.STATUS);
            setShuiWen(data.ShuiWen);
            setQiXiang(data.QIXG);
            $("#DataLoading").modal('hide');
            $("#navDiv").show();
            $("#tab_content").show();
        }
    });
}

function setEcology(data, pingjiaData) {
    var delCol = "DEVICECODE,DATETIME,COLOGYPOINTLIST,SENDNUM,RECVNUM,RESERV0,RESERV1,RESERV2,RESERV3,RESERV4,RESERV5,RESERV6,RESERV7,RESERV8,RESERV9"
    + ",RESERV10,RESERV11,RESERV12,RESERV13,RESERV14,RESERV15,RESERV16,RESERV17,RESERV18,RESERV19";
    $("#ecology").html("");
    if (data) {
        for (var Key in data) {
            if (delCol.indexOf(Key) == -1) {
                var sli;
                if ("CURRENTTEM" == Key) {
                    if (0 == pingjiaData["CURRENTTEM"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "海浪水温(℃)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "海浪水温(℃)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                }
                else if ("WATERTEM" == Key) {
                    if (0 == pingjiaData["WATERTEM"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "独立水温(℃)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "独立水温(℃)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CTDTEM" == Key) {
                    if (0 == pingjiaData["CTDTEM"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "CTD水温(℃)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "CTD水温(℃)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("SALINITY" == Key) {
                    if (0 == pingjiaData["SALINITY"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "盐度" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "盐度" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CONDUCTIVITY" == Key) {
                    if (0 == pingjiaData["CONDUCTIVITY"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "电导率(ms/cm)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "电导率(ms/cm)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("OXYGEN" == Key) {
                    if (0 == pingjiaData["OXYGEN"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "溶解氧(DO)(Mg/l)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "溶解氧(DO)(Mg/l)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PH" == Key) {
                    if (0 == pingjiaData["PH"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "PH值(pH)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "PH值(pH)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("TURBIDITY" == Key) {
                    if (0 == pingjiaData["TURBIDITY"]) {
                        sli = "<li><span class='TURBIDITY'>" + data[Key].toFixed(3) + "</span><span>" + "浊度(FTU)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "浊度(FTU)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("YLS" == Key) {
                    if (0 == pingjiaData["YLS"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "叶绿素(μg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "叶绿素(μg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("YLSTEM" == Key) {
                    if (0 == pingjiaData["YLSTEM"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "叶绿素温度" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "叶绿素温度" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("UNDERWATERCO2" == Key) {
                    if (0 == pingjiaData["UNDERWATERCO2"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "水下二氧化碳" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "水下二氧化碳" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("OXYGENCHEMICAL" == Key) {
                    if (0 == pingjiaData["OXYGENCHEMICAL"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "化学需氧量" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "化学需氧量" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("MNO4" == Key) {
                    if (0 == pingjiaData["MNO4"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "高锰酸盐指数(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "高锰酸盐指数(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("OXYGENBIOLOGY" == Key) {
                    if (0 == pingjiaData["OXYGENBIOLOGY"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "生化需氧量(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "生化需氧量(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("NH3N" == Key) {
                    if (0 == pingjiaData["NH3N"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "氨氮(铵盐)(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "氨氮(铵盐)(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("NO3" == Key) {
                    if (0 == pingjiaData["NO3"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "硝酸盐-氮(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "硝酸盐-氮(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("NO2" == Key) {
                    if (0 == pingjiaData["NO2"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "亚硝酸盐-氮(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "亚硝酸盐-氮(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PO4" == Key) {
                    if (0 == pingjiaData["PO4"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "活性磷酸盐(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "活性磷酸盐(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("SIO3" == Key) {
                    if (0 == pingjiaData["SIO3"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "硅酸盐(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "硅酸盐(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PAHS" == Key) {
                    if (0 == pingjiaData["PAHS"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "多环芳烃(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "多环芳烃(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("P" == Key) {
                    if (0 == pingjiaData["P"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "总磷(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "总磷(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("N" == Key) {
                    if (0 == pingjiaData["N"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "总氮(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "总氮(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("C" == Key) {
                    if (0 == pingjiaData["C"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "总有机碳(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "总有机碳(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("S" == Key) {
                    if (0 == pingjiaData["S"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "硫(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "硫(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("ALKALINITY" == Key) {
                    if (0 == pingjiaData["ALKALINITY"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "总碱度" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "总碱度" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("SUSPENSION" == Key) {
                    if (0 == pingjiaData["SUSPENSION"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "悬浮物(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "悬浮物(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CYANIDE" == Key) {
                    if (0 == pingjiaData["CYANIDE"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "氰化物(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "氰化物(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("HG" == Key) {
                    if (0 == pingjiaData["HG"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "汞(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "汞(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CD" == Key) {
                    if (0 == pingjiaData["CD"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "镉(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "镉(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CR6" == Key) {
                    if (0 == pingjiaData["CR6"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "六价铬(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "六价铬(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PB" == Key) {
                    if (0 == pingjiaData["PB"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "铅(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "铅(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("AS" == Key) {
                    if (0 == pingjiaData["AS"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "砷(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "砷(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("YLSA" == Key) {
                    if (0 == pingjiaData["YLSA"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "叶绿素-a(μg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "叶绿素-a(μg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PHYCOCY" == Key) {
                    if (0 == pingjiaData["PHYCOCY"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "藻蓝素" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "藻蓝素" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PHYCOER" == Key) {
                    if (0 == pingjiaData["PHYCOER"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "藻红素" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "藻红素" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("COLIFORM" == Key) {
                    if (0 == pingjiaData["COLIFORM"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "粪大肠菌群(个/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "粪大肠菌群(个/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("POTENTIAL" == Key) {
                    if (0 == pingjiaData["POTENTIAL"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "氧化还原电位" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "氧化还原电位" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("TOTALY" == Key) {
                    if (0 == pingjiaData["TOTALY"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "总γ(Bq/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "总γ(Bq/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("K40" == Key) {
                    if (0 == pingjiaData["K40"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "40K(Bq/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "40K(Bq/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CS134" == Key) {
                    if (0 == pingjiaData["CS134"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "134Cs(Bq/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "134Cs(Bq/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CS137" == Key) {
                    if (0 == pingjiaData["CS137"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "137Cs(Bq/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "137Cs(Bq/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CO60" == Key) {
                    if (0 == pingjiaData["CO60"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "60Co(Bq/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "60Co(Bq/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CU" == Key) {
                    if (0 == pingjiaData["CU"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "铜(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "铜(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("ZN" == Key) {
                    if (0 == pingjiaData["ZN"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "锌(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "锌(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PHENOL" == Key) {
                    if (0 == pingjiaData["PHENOL"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "挥发酚(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "挥发酚(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("BOD5" == Key) {
                    if (0 == pingjiaData["BOD5"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "挥发性有机物" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "挥发性有机物" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("DETERGENTS" == Key) {
                    if (0 == pingjiaData["DETERGENTS"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "阴离子洗涤剂" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "阴离子洗涤剂" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("OIL" == Key) {
                    if (0 == pingjiaData["OIL"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "油类(mg/L)" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "油类(mg/L)" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("VIRUS" == Key) {
                    if (0 == pingjiaData["VIRUS"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "细菌总数" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "细菌总数" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PETRO" == Key) {
                    if (0 == pingjiaData["PETRO"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "石油烃" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "石油烃" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("DDT" == Key) {
                    if (0 == pingjiaData["DDT"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "DDT" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "DDT" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("PCBS" == Key) {
                    if (0 == pingjiaData["PCBS"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "PCBs" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "PCBs" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("BENZOL" == Key) {
                    if (0 == pingjiaData["BENZOL"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "多氯联苯" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "多氯联苯" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("CHLO" == Key) {
                    if (0 == pingjiaData["CHLO"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "氯霉素" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "氯霉素" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("ANTIBIOTIC" == Key) {
                    if (0 == pingjiaData["ANTIBIOTIC"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "抗生素" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "抗生素" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("POISONA" == Key) {
                    if (0 == pingjiaData["POISONA"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "腹泻性贝毒" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "腹泻性贝毒" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                } else if ("POISONB" == Key) {
                    if (0 == pingjiaData["POISONB"]) {
                        sli = "<li><span class='redFont'>" + data[Key].toFixed(3) + "</span><span>" + "麻痹性贝毒" + "</span></li>";
                    } else {
                        sli = "<li><span class='blankFont'>" + data[Key].toFixed(3) + "</span><span>" + "麻痹性贝毒" + "</span></li>";
                    }

                    $("#ecology").append(sli);
                }
            }
        }
    } else {
        var sli;
        sli = "<li><span>--</span><span>" + "海浪水温(℃)" + "</span></li>"
                   + "<li><span>--</span><span>" + "独立水温(℃)" + "</span></li>"
                   + "<li><span>--</span><span>" + "CTD水温(℃)" + "</span></li>"
                   + "<li><span>--</span><span>" + "盐度" + "</span></li>"
                   + "<li><span>--</span><span>" + "电导率(ms/cm)" + "</span></li>"
                   + "<li><span>--</span><span>" + "溶解氧(DO)(Mg/l)" + "</span></li>"
                   + "<li><span>--</span><span>" + "PH值(pH)" + "</span></li>"
                   + "<li><span>--</span><span>" + "浊度(FTU)" + "</span></li>"
                   + "<li><span>--</span><span>" + "叶绿素(μg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "叶绿素温度" + "</span></li>"
                   + "<li><span>--</span><span>" + "水下二氧化碳" + "</span></li>"
                   + "<li><span>--</span><span>" + "化学需氧量" + "</span></li>"
                   + "<li><span>--</span><span>" + "高锰酸盐指数(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "生化需氧量(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "氨氮(铵盐)(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "硝酸盐-氮(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "亚硝酸盐-氮(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "活性磷酸盐(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "硅酸盐(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "多环芳烃(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "总磷(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "总氮(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "总有机碳(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "硫(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "总碱度" + "</span></li>"
                   + "<li><span>--</span><span>" + "悬浮物(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "氰化物(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "汞(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "镉(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "六价铬(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "铅(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "砷(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "叶绿素-a(μg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "藻蓝素" + "</span></li>"
                   + "<li><span>--</span><span>" + "藻红素" + "</span></li>"
                   + "<li><span>--</span><span>" + "粪大肠菌群(个/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "氧化还原电位" + "</span></li>"
                   + "<li><span>--</span><span>" + "总γ(Bq/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "40K(Bq/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "134Cs(Bq/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "137Cs(Bq/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "60Co(Bq/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "铜(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "锌(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "挥发酚(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "挥发性有机物" + "</span></li>"
                   + "<li><span>--</span><span>" + "阴离子洗涤剂" + "</span></li>"
                   + "<li><span>--</span><span>" + "油类(mg/L)" + "</span></li>"
                   + "<li><span>--</span><span>" + "细菌总数" + "</span></li>"
                   + "<li><span>--</span><span>" + "石油烃" + "</span></li>"
                   + "<li><span>--</span><span>" + "DDT" + "</span></li>"
                   + "<li><span>--</span><span>" + "PCBs" + "</span></li>"
                   + "<li><span>--</span><span>" + "多氯联苯" + "</span></li>"
                   + "<li><span>--</span><span>" + "氯霉素" + "</span></li>"
                   + "<li><span>--</span><span>" + "抗生素" + "</span></li>"
                   + "<li><span>--</span><span>" + "腹泻性贝毒" + "</span></li>"
                   + "<li><span>--</span><span>" + "麻痹性贝毒" + "</span></li>";
        $("#ecology").append(sli);
    }
}

function setBaoJingXianShi(data) {

    $("#bjtsUl").html("");
    var sli;
    if (data) {
        if (data.HUMI == 1) {
            sli = "<li><span>湿度状态：</span><img src='/img/icon_green.png'  alt='' /></li>"
        } else if (data.GPSALARM == 2) {
            sli = "<li><span>湿度状态：</span><img src='/img/icon_red.png'  alt='' /></li>"
        } else {
            sli = "<li><span>湿度状态：</span>--</li>"
        }
        $("#bjtsUl").append(sli);

        if (data.POWERSTATUS == 1) {
            sli = "<li><span>供电状态：</span><img src='/img/icon_green.png'  alt='' /></li>"
        } else if (data.ANCHOR == 2) {
            sli = "<li><span>供电状态：</span><img src='/img/icon_red.png'  alt='' /></li>"
        } else {
            sli = "<li><span>供电状态：</span>--</li>"
        }
        $("#bjtsUl").append(sli);
        if (data.FREEMEMO) {
            sli = "<li><span>存储空间：</span>" + data.FREEMEMO + "M</li>"
        }else {
            sli = "<li><span>存储空间：</span>--</li>"
        }
        $("#bjtsUl").append(sli);
        if (data.TEMPERATURE) {
            sli = "<li><span>舱温：</span>" + data.TEMPERATURE + "M</li>"
        } else {
            sli = "<li><span>舱温：</span>--</li>"
        }
        $("#bjtsUl").append(sli);
        
        if (data.WATERALARM == 1) {
            sli = "<li><span>水警：</span><img src='/img/icon_green.png'  alt='' /></li>"
        } else if (data.WATERALARM == 2) {
            sli = "<li><span>水警：</span><img src='/img/icon_red.png'  alt='' /></li>"
        } else {
            sli = "<li><span>水警：</span>--</li>"
        }
        $("#bjtsUl").append(sli);

        if (data.DOORALARM == 1) {
            sli = "<li><span>门警：</span><img src='/img/icon_green.png'  alt='' /></li>"
        } else if (data.DOORALARM == 2) {
            sli = "<li><span>门警：</span><img src='/img/icon_red.png'  alt='' /></li>"
        } else {
            sli = "<li><span>门警：</span>--</li>"
        }
        $("#bjtsUl").append(sli);

        if (data.SMOGALARM == 1) {
            sli = "<li><span>烟雾状态：</span><img src='/img/icon_green.png'  alt='' /></li>"
        } else if (data.SMOGALARM == 2) {
            sli = "<li><span>烟雾状态：</span><img src='/img/icon_red.png'  alt='' /></li>"
        } else {
            sli = "<li><span>烟雾状态：</span>--</li>"
        }
        $("#bjtsUl").append(sli);

        if (data.STATIONSTATUS == 1) {
            sli = "<li><span>岸基站状态：</span><img src='/img/icon_green.png'  alt='' /></li>"
        } else if (data.BUOYSTATUS == 2) {
            sli = "<li><span>岸基站状态：</span><img src='/img/icon_red.png'  alt='' /></li>"
        } else if (data.BUOYSTATUS == 3) {
            sli = "<li><span>岸基站状态：</span><img src='/img/icon_yellow.png'  alt='' /></li>"
        } else {
            sli = "<li><span>岸基站状态：</span>--</li>"
        }
        $("#bjtsUl").append(sli);
    } else {
        
        sli = "<li><span>湿度状态：</span>--</li><li><span>供电状态：</span>--</li><li><span>存储空间：</span>--M</li>"
            + "<li><span>舱温：</span>--</li><li><span>水警：</span>--</li><li><span>门警：</span>--</li><li><span>烟雾状态：</span>--</li>"
           +"<li><span>传感器状态：</span>--</li><li><span>岸基站状态：</span>--</li>"
       
        $("#bjtsUl").append(sli);
    }
   }

function setShuiWen(data) {
    var sli = "";
    $("#swUl").html("");
    if (data) {
        sli = "<li><span>水位：</span>" + data.WATERLEVEL.toFixed(3) + "</li><li><span>水深：</span>" + data.DEPTH.toFixed(3) + "</li><li><span>水温：</span>" + data.WATERTEM.toFixed(3) + "</li>"
       + "<li><span>流速：</span>" + data.CURRENTSPD.toFixed(3) + "</li><li><span style='float:left;'>流向：</span><ul  class='liuxiangtu' style='position: relative; float:left;margin-left:25px;'><div id='liuxiangtu' ></div>"
                                        + "<div id='liuxiangtuVal' ><span>流向：</span>360</div>"
                                    + "</ul></li><li><span>流量：</span>" + data.CURRENTVOL.toFixed(3) + "</li>";
        $("#swUl").append(sli);
        $("#liuxiangtuVal").html(data.CURRENTDIR);
        setLXT("liuxiangtu", data.CURRENTDIR);
    } else {
        sli = "<li><span>水位：</span>--</li><li><span>水深：</span>--</li><li><span>水温</span>--</li>" + "<li>--</li>"
       + "<li><span>流速</span>--</li><li><span>流向</span><ul><div>--</div></ul></li><li><span>流量</span>--</li>";
        $("#swUl").append(sli);
        $("#liuxiangtuVal").html("");
    }
}

function setQiXiang(data) {
    var sli = "";
    $("#qxUl").html("");
    if (data) {
        sli = "<li><span>降雨量：</span>" + data.RAINFALL + "</li><li><span>气温：</span>" + data.AIRTEM.toFixed(1) + "</li><li><span>气压：</span>" + data.PRESSURE.toFixed(3) + "</li>"
    + "<li><span>风速：</span>" + data.AVESPD.toFixed(3) + "</li><li ><span style='float:left;'>风向：</span><ul class='fengxiangtuAnJi' style='position: relative;float:left;margin-left:25px;'><div id='fengxiangtuAnJi'></div><div id='fengXiangVal2'></div></ul></li> <li><span>能见度：</span>" + data.NJD + "</li>";
        $("#qxUl").append(sli);

        setLXT("fengxiangtuAnJi", data.AVEDIR);//data.AVEDIR
        $("#fengXiangVal2").html(data.AVEDIR.toFixed(3));
    } else {
        sli = "<li><span>降雨量：</span>--</li><li><span>气温：</span>--</li><li><span>气压：</span>--</li>"
+ " <li><span>风速：</span>--</li><li ><span style='float:left;'>风向：</span><ul class='fengxiangtuAnJi' style='position: relative;float:left;margin-left:25px;'><div id='fengxiangtuAnJi'></div><div id='fengXiangVal2'>--</div></ul></li><li><span>能见度：</span>--</li>";
        $("#qxUl").append(sli);
        $("#fengXiangVal2").html("--");
    }

}

// 流向图
function setLXT(domId,CURRENTDIR) {
    // 流向图
    var myChart = echarts.init(document.getElementById(domId));
    option = {
        backgroundColor: 'rgba(0,0,0,0)',
        // backgroundImage: '#1b1b1b',
        tooltip: {
            show: false,
            formatter: "{a}  : {c}°"
        },
        series: [
            {
                name: '流向',
                type: 'gauge',
                // center: ['50%', '40%'],    // 默认全局居中
                //radius: '58%',
                startAngle: 90,
                endAngle: -269.999,
                max: 360,
                detail: {
                    show: false,
                    formatter: '90'
                }, //仪表盘显示数据
                axisLine: { //仪表盘轴线样式
                    show: false,
                    lineStyle: {
                        width: 6,
                        show: false
                    }
                },
                splitNumber: 4,       // 分割段数，默认为5
                splitLine: {           // 分隔线
                    show: true,        // 默认显示，属性show控制显示与否,这里设为false将隐藏分割线！！
                    length: 12,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: '#f02d00',
                        width: 0,
                        type: 'solid'
                    }
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#f02d00']],
                        width: 0
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false,        // 属性show控制显示与否，默认不显示
                    splitNumber: 5,    // 每份split细分多少段
                    length: 8,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#ffbd2c',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    show: false,
                    formatter: function (v) {
                        switch (v + '') {
                            case '0': return '北';
                            case '90': return '东';
                            case '180': return '南';
                            case '270': return '西';
                            default: return '';
                        }
                    },
                    distance: -26,
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        // color: '#333'
                    }
                },
                pointer: {
                    length: '70%',
                    width: 4,
                    color: 'auto'
                },
                data: [{ value: CURRENTDIR, name: '' }]
            }
        ]
    };

    myChart.setOption(option);
}
