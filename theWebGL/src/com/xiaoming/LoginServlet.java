package com.xiaoming;

import util.DBConn;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@javax.servlet.annotation.WebServlet("/LoginServlet")
public class LoginServlet extends javax.servlet.http.HttpServlet {
    private static final long serialVersionUID = 8188047568004924741L;

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String email = request.getParameter("email");
        String pwd = request.getParameter("password");
        String sql = "select * from user where email ='" + email + "'";
        Connection conn = null;
        Connection conn2 = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt2 = null;
        ResultSet rs = null;
        try {
            conn = DBConn.getConn();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            // 设置用户
            while (rs.next()) {
                if (pwd.equals(rs.getString("PASSWORD"))) {
                    String sql2 = "UPDATE USER SET LOGIN_FLAG = '1' WHERE ID = " + rs.getInt("ID");
                    try {
                        conn2 = DBConn.getConn();
                        pstmt2 = conn2.prepareStatement(sql2);
                        int count = pstmt2.executeUpdate(); //登陆标记的修改
                        System.out.println("::: count:: " + count);
                        response.sendRedirect("index.html");
                        return;
                    } catch (Exception e) {
                        e.printStackTrace();
                        response.sendRedirect("login.html");
                        return;
                    }
                } else {
                    response.sendRedirect("login.html");
                    return;
                }
            }
            response.sendRedirect("login.html");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBConn.closeDB(rs, pstmt, conn);
        }
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doPost(request, response);
    }
}
