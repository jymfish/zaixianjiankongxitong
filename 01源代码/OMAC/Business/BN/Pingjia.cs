﻿using System;
using System.Data;
using System.Data.OracleClient;
using System.Text;
using Entity.System;

namespace Business.BN
{
    public class Pingjia
    {
        /// <summary>
        /// 获取监测要素列表
        /// </summary>
        /// <returns></returns>
        public DataTable GetJcysList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("select * from TABSTD where std_type is not null order by std_id asc");
                var dbapi = new DbAPI();
                dbapi.OpenConn("");
                var rst = dbapi.GetDataTable(strSql.ToString(), null);
                dbapi.CloseConn();
                return rst;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(MonitorLog), "获取监测要素列表GetJcysList 程序段的异常" + ex);
                return null;
            }

        }

        /// <summary>
        /// 获取达标率
        /// </summary>
        /// <param name="devicecode">设备编号</param>
        /// <param name="jcys">监测项目</param>
        /// <param name="beginDate">开始日期</param>
        /// <param name="endDate">结束日期</param>
        /// <returns></returns>
        public DataTable GetDabiaolv(string devicecode, string jcys, string beginDate, string endDate)
        {
            try
            {
                #region 拼SQL语句的方法,因为要查询两次数据库,已弃用

                //var strSql = "select a.STDTYPE,b.devicetype from DEVICEATTACH a";
                //strSql += " left join deviceinfo b on a.devicecode=b.devicecode";
                //strSql += " WHERE a.DEVICECODE=:devicecode";
                //OracleParameter[] parameters =
                //{
                //    new OracleParameter(":devicecode", devicecode)
                //};
                //var dbapi = new DbAPI();
                //dbapi.OpenConn("");
                //var rst = dbapi.GetDataTable(strSql, parameters);
                //dbapi.CloseConn();
                //var stdtype = Convert.ToInt32(rst.Rows[0]["STDTYPE"]);
                //var devicetype = Convert.ToInt32(rst.Rows[0]["devicetype"]);

                //// 时间段超过半年的,按照月统计
                //var ts = DateTime.Parse(endDate) - DateTime.Parse(beginDate);
                //if (ts.Days > 182)
                //{
                //    strSql = "SELECT A.SDATE, round(SUM(A.\"" + jcys + "\") / COUNT(A.\"" + jcys + "\") * 100,0) DABIAOLV";
                //    strSql += "  FROM (SELECT t.*, TO_CHAR(t.DATETIME, 'YYYY-MM') AS SDATE";
                //    strSql += "          FROM " +
                //              PingjiaViewConfigs.PingjiaLevelViewDict[
                //                  new PingjiaTab<int, int>(devicetype, stdtype)] + " t";
                //    strSql += "         WHERE DEVICECODE = :devicecode";
                //    strSql += "           AND DATETIME BETWEEN";
                //    strSql += "               to_date(:beginDate, 'yyyy-mm-dd') AND";
                //    strSql += "               to_date(:endDate, 'yyyy-mm-dd')) A";
                //    strSql += " GROUP BY A.SDATE";
                //    strSql += " ORDER BY A.SDATE ASC";
                //}
                //else
                //{
                //    strSql = "SELECT A.SDATE, round(SUM(A.\"" + jcys + "\") / COUNT(A.\"" + jcys + "\") * 100,0) DABIAOLV";
                //    strSql += "  FROM (SELECT t.*, TO_CHAR(t.DATETIME, 'YYYY-MM-DD') AS SDATE";
                //    strSql += "          FROM " +
                //              PingjiaViewConfigs.PingjiaLevelViewDict[
                //                  new PingjiaTab<int, int>(devicetype, stdtype)] + " t";
                //    strSql += "         WHERE DEVICECODE = :devicecode";
                //    strSql += "           AND DATETIME BETWEEN";
                //    strSql += "               to_date(:beginDate, 'yyyy-mm-dd') AND";
                //    strSql += "               to_date(:endDate, 'yyyy-mm-dd')) A";
                //    strSql += " GROUP BY A.SDATE";
                //    strSql += " ORDER BY A.SDATE ASC";
                //}

                //OracleParameter[] parameters2 ={
                //    new OracleParameter(":devicecode", devicecode),
                //    new OracleParameter(":beginDate", beginDate),
                //    new OracleParameter(":endDate",endDate)
                //};

                //dbapi.OpenConn("");
                //rst = dbapi.GetDataTable(strSql, parameters2);
                //dbapi.CloseConn();

                //const string proc = "Getdabiaolv";

                #endregion

                OracleParameter[] parameters =
                {
                    new OracleParameter("p_devicecode", devicecode),
                    new OracleParameter("p_jcys", jcys),
                    new OracleParameter("p_beginDate", beginDate),
                    new OracleParameter("p_endDate", endDate),
                    new OracleParameter("p_refCursor", OracleType.Cursor)
                    {
                        Direction = ParameterDirection.Output
                    }
                };

                var dbapi = new DbAPI();
                dbapi.OpenConn("");
                var rst = dbapi.GetDataTableFromProcedure("Getdabiaolv", parameters);
                dbapi.CloseConn();

                return rst;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(MonitorLog), "获取达标率GetDabiaolv 程序段的异常" + ex);
                return null;
            }

        }



    }
}
