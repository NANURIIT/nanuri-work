/** complete_add **/
'use strict';

/** onload **/
$(function(){

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    if (mode == 'M') {
        getEducationDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            eduNm : $('#eduNm').val(), 
            stDt : $('#stDt').val(), 
            edDt : $('#edDt').val(),
            orgNm : $('#orgNm').val()
        };

        if (mode == 'W') {
            registerEducation(params);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerEducation(params);
        }
    });

});

/**
 * 
 * @param {string} params.eduNm 교육명 
 * @param {string} params.stDt 시작일
 * @param {string} params.edDt 종료일
 * @param {string} params.orgNm 기관명
 * @param {number} params.seqNo 일련번호
 */
var registerEducation = function(params){
    if(isEmpty(params.eduNm)){
        openPopup({
            title: '실패',
            text: '교육명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#eduNm').focus();
                });
            }
        });
    } else if(dateValidation(params.stDt) == false){
        openPopup({
            title: '실패',
            text: '시작일을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#stDt').focus();
                });
            }
        });
    } else if(dateValidation(params.edDt) == false){
        openPopup({
            title: '실패',
            text: '종료일을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#edDt').focus();
                });
            }
        });
    } else if(isEmpty(params.orgNm)){
        openPopup({
            title: '실패',
            text: '기관명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#orgNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/employee/educationWrite', 
            data : params, 
            success: openPopup({
                title: '성공',
                text: '교육이수 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}

let params = {
    eduNm : $('#eduNm').val(), 
    stDt : $('#stDt').val(), 
    edDt : $('#edDt').val(),
    orgNm : $('#orgNm').val()
};
/**
 * 교육이수 상세 조회
 * @param {number} seqNo 일련번호
 */
var getEducationDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/educationDetail/' + seqNo, 
        success : function(object){
            $('#eduNm').val(object.eduNm);
            $('#stDt').val(object.stDt);
            $('#edDt').val(object.edDt);
            $('#orgNm').val(object.orgNm);
        }
    });
}

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @return {boolean} 유효성 검사 결과
 */
 var dateValidation = function (date) {
    if (isEmpty(date)) {
        return false;
    } else if (isNaN(date)) {
        return false;
    } else if (date.length > 8) {
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, 6) < 0 || date.substring(4, 6) > 12) {
        return false;
    } else if (date.substring(6, 8) < 0 || date.substring(6, 8) > 31) {
        return false;
    }
}