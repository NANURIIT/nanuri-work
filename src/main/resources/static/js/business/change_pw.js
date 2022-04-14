/** employee_add **/
'use strict';

/** onload **/
$(function(){

    let regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()/.,?])[A-Za-z\d!@#$%^&*()/.,?]{8,}$/;

    // 변경 버튼 클릭
    $(document).on('click', '#change', function(){
        let params = {
            currPwd : $('#currPwd').val(), 
            newPwd : $('#newPwd').val(), 
            confirmNewPwd : $('#confirmNewPwd').val()
        }
        
        if(!regPassword.test(params.newPwd)){
            openPopup({
                title : '실패', 
                text : '비밀번호는 영어, 숫자, 특수문자 포함 8자리 이상 입력해주세요.', 
                type : 'error', 
                callback : function(){
                    $(document).on('click', '.confirm', function () {
                        $('#newPwd').focus();
                    });
                }
            });
        } else if(params.currPwd == params.newPwd){
            openPopup({
                title : '실패', 
                text : '이미 사용하고 있는 비밀번호 입니다. 다른 비밀번호를 입력해주세요.', 
                type : 'error', 
                callback : function(){
                    $(document).on('click', '.confirm', function () {
                        $('#newPwd').focus();
                    });
                }
            });
        } else if(params.newPwd != params.confirmNewPwd){
            openPopup({
                title : '실패', 
                text : '새로운 비밀번호가 일치하지 않습니다.', 
                type : 'error', 
                callback : function(){
                    $(document).on('click', '.confirm', function () {
                        $('#confirmNewPwd').focus();
                    });
                }
            });
        } else {
            delete params.confirmNewPwd;
            changePassword(params);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.changepw_cancel', function(){
        history.go(-1);
    });
}); 

/**
 * 비밀번호 변경
 * @param {string} params.currPwd 현재 비밀번호
 * @param {string} params.newPwd 새 비밀번호
 */
var changePassword = function(params){
    ajaxCall({
        method : 'PATCH', 
        url : '/employee/changePassword', 
        data : params, 
        success : function(object){
            if(object){
                openPopup({
                    title: '성공',
                    text: '비밀번호를 변경했습니다.',
                    type: 'success',
                    callback: function () {
                        history.go(-1);
                    }
                })
            } else if(!object){
                openPopup({
                    title : '실패', 
                    text : '현재 비밀번호가 일치하지 않습니다.', 
                    type : 'error', 
                    callback : function(){
                        $(document).on('click', '.confirm', function () {
                            $('#currPwd').focus();
                        });
                    }
                });
            }
        }
    })
}