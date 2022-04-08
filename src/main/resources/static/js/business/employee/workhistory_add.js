/** workhistory_add **/
'use strict';

/** onload **/
$(function(){

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    if (mode == 'M') {
        getWorkhistoryDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            wrkplNm : $('#wrkplNm').val(), 
            encoYm : $('#encoYm').val(),
            rtrmYm : $('#rtrmYm').val(), 
            dtyNm : $('#dtyNm').val(), 
            chrgBsnNm : $('#chrgBsnNm').val()
        }

        if (mode == 'W') {
            registerWorkhistory(params);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerWorkhistory(params);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function(){
        location.href = '/mobile/employeeInfo';
    });
});

var registerWorkhistory = function(params){
    if(isEmpty(params.wrkplNm)){
        openPopup({
            title: '실패',
            text: '근무처를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#wrkplNm').focus();
                });
            }
        });
    } else if(dateValidation(params.encoYm) == false){
        openPopup({
            title: '실패',
            text: '입사년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#encoYm').focus();
                });
            }
        });
    } else if(dateValidation(params.rtrmYm) == false){
        openPopup({
            title: '실패',
            text: '퇴사년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#rtrmYm').focus();
                });
            }
        });
    } else if(isEmpty(params.dtyNm)){
        openPopup({
            title: '실패',
            text: '직책을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#dtyNm').focus();
                });
            }
        });
    } else if(isEmpty(params.chrgBsnNm)){
        openPopup({
            title: '실패',
            text: '담당업무를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#chrgBsnNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/employee/workhistoryWrite', 
            data : params, 
            success : openPopup({
                title : '성공', 
                text : '회사소속이력 등록에 성공했습니다.', 
                type : 'success', 
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}

/**
 * 회사소속이력 상세 조회
 * @param {number} seqNo 일련번호
 */
var getWorkhistoryDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/workhistoryDetail/' + seqNo, 
        success : function(object){
            $('#wrkplNm').val(object.wrkplNm);
            $('#encoYm').val(object.encoYm);
            $('#rtrmYm').val(object.rtrmYm);
            $('#dtyNm').val(object.dtyNm);
            $('#chrgBsnNm').val(object.chrgBsnNm);
        }
    })
}

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @returns {boolean} 유효성 검사 결과
 */
 var dateValidation = function (date) {
    if (isEmpty(date)) {
        return false;
    } else if (isNaN(date)) {
        return false;
    } else if (date.length > 6) {
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, date.length) < 0 || date.substring(4, date.length) > 12) {
        return false;
    }
}