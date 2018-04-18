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
        String sql = "select * from user";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = DBConn.getConn();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            // 设置用户

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doPost(request, response);
    }
}
