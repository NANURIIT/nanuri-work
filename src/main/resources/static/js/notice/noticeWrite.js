/** common **/
'use strict';

/** onload **/
$(function(){
    registerNotice();
});

function registerNotice(){
    $(document).on('click', '.qna_register', function(){
        let params = {
            bultTitlNm : $('#noticeTitle').val(),
            bultTypCd : 'NOTICE',  
            brcn : $('#noticeContent').val()
        }
        if(isEmpty(params.bultTitlNm)){
            openPopup({ 
                title : '실패', 
                text : '제목을 입력해주세요.', 
                type : 'error',
                callback : function(){
                    $('#noticeTitle').focus();
                }
            });
        } else if(isEmpty(params.brcn)){
            openPopup({ 
                title : '실패', 
                text : '내용을 입력해주세요.', 
                type : 'error',
                callback : function(){
                    $('#noticeContent').focus();
                }
            });
        } else {
            ajaxCall({
                method : 'POST', 
                url : '/admin/boardWrite',
                data : params, 
                success : openPopup({
                    title : '성공', 
                    text : '공지사항 등록에 성공했습니다.', 
                    type : 'success', 
                    callback : function(){
                        location.href = '/admin/notice';
                    }
                })
                
            });
        }
    });
}
