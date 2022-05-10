/** noticeWrite **/
'use strict';

/** onload **/
$(function () {
    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    if(mode == 'W'){
        $('#notice_public_check').prop('checked', true);
    }

    if(mode == 'M'){
        getBoardDetail(seqNo);
    }

    // 등록버튼 클릭
    $(document).on('click', '#noticeRegister', function () {
        let params = {
            bultTitlNm: $('#noticeTitle').val(),
            bultTypCd: 'NOTICE',
            brcn: $('#noticeContent').val()
        }

        if($('#notice_public_check').is(':checked')){
            params.opnpEstNm = $('#notice_public_check').val();
        } else if($('#notice_secret_check').is(':checked')){
            params.opnpEstNm = $('#notice_secret_check').val();
        }

        if(mode == 'W'){   
            registerNotice(params);
        } else if(mode == 'M'){
            params.seqNo = seqNo;
            registerNotice(params);
        }
        
    });

    // 취소버튼 클릭
    $(document).on('click', '#cancel', function(){
        history.go(-1);
    });
});

/**
 * 게시글 등록 함수
 * @param {String} params.bultTitlNm 게시글 제목
 * @param {String} params.bultTypCd  게시글 타입
 * @param {String} params.brcn       게시글 내용
 * @param {Number} params.seqNo      일련번호
 */
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

/**
 * 수정모드일 때 게시글 내용 호출 함수
 * @param {Number} seqNo 게시글 번호
 */
var getBoardDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/admin/boardDetail/' + seqNo, 
        success : function(object){
            $('#noticeTitle').val(object.bultTitlNm);
            $('#noticeContent').val(object.brcn);
            if(object.opnpEstNm == 'ALL'){
                $('#notice_public_check').prop('checked', true);
            } else if(object.opnpEstNm == 'EMPLOYEE'){
                $('#notice_secret_check').prop('checked', true);
            }
        }
    })
}