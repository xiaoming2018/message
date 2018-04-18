package util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 数据库连接工具类
 */
public class DBConn {
	
	private static final String CLASS_NAME = "com.mysql.jdbc.Driver";	
	private static final String CONN_STRING = "jdbc:mysql://localhost:3306/webgl";
	private static final String USER = "root";
	private static final String PASS = "123456";
	
	/**
	 * 获取数据库连接对象
	 */
	public static Connection getConn(){
		Connection conn = null;
		try {
			Class.forName(CLASS_NAME); //加载驱动
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			//获取连接
			conn = DriverManager.getConnection(CONN_STRING,USER,PASS);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	/**
	 * 关闭数据库连接等资源
	 */
	public static void closeDB(ResultSet rs,PreparedStatement pstmt,Connection conn){
		try {
			if(rs != null){
				rs.close();
			}
			if(pstmt != null){
				pstmt.close();
			}
			if(conn != null){
				conn.close();	//关闭连接
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
