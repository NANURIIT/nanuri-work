/** common **/
'use strict';

/** onload **/
$(function () {
    let link = document.location.href;
    let mode = link.includes('?seqNo=') ? 'M' : 'W';    // 작성인지 수정인지 모드 설정

    if(mode == 'M'){
        let seqNo = link.substring(link.length-1, link.length); // seqNo세팅
        getBoardDetail(seqNo);
    }

    $(document).on('click', '.qna_register', function () {
        let params = {
            bultTitlNm: $('#noticeTitle').val(),
            bultTypCd: 'NOTICE',
            brcn: $('#noticeContent').val()
        }
        if(mode == 'W'){   
            registerNotice(params);
        } else if(mode == 'M'){
            params.seqNo = link.substring(link.length-1, link.length);
            registerNotice(params);
        }
        
    });
});

var registerNotice = function(params) {

    if (isEmpty(params.bultTitlNm)) {
        openPopup({
            title: '실패',
            text: '제목을 입력해주세요.',
            type: 'error',
            callback: function () {
                $('#noticeTitle').focus();
            }
        });
    } else if (isEmpty(params.brcn)) {
        openPopup({
            title: '실패',
            text: '내용을 입력해주세요.',
            type: 'error',
            callback: function () {
                $('#noticeContent').focus();
            }
        });
    } else {
        ajaxCall({
            method: 'POST',
            url: '/admin/boardWrite',
            data: params,
            success: openPopup({
                title: '성공',
                text: '공지사항 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/admin/notice';
                }
            })

        });
    }
}

 var getBoardDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/admin/boardDetail/' + seqNo, 
        success : getBoardDetailCB
    })
}

var getBoardDetailCB = function(object){
    $('#noticeTitle').val(object.bultTitlNm);
    $('#noticeContent').val(object.brcn);
}
