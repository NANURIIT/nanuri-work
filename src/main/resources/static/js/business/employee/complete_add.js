/** complete_add **/
'use strict';

/** onload **/
$(function(){

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

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
            registerEducation(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerEducation(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
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
var registerEducation = function(params, pathname){
    if(isValid(params)){
        ajaxCall({
            method : 'POST', 
            url : '/employee/educationWrite', 
            data : params, 
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '교육이수 등록에 성공했습니다.',
                        type: 'success',
                        callback: function () {
                            location.href = '/'+pathname+'/index';
                        }
                    });
                } else {
                    openPopup({
                        title : '실패', 
                        text : message, 
                        type : 'error'
                    });
                }
            }
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
        success : function(education){
            fillInputValue(education);
        }
    });
}

/**
 * 유효성검사
 * @param {object} params 교육정보
 * @returns boolean
 */
var isValid = function(params){
    let flag = false;

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
    } else if(dateValidation(params.stDt) == false || params.stDt.length != 8){
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
    } else if(dateValidation(params.edDt) == false || params.edDt.length != 8){
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
        flag = true;
    }

    return flag;
}