/** award_add **/
'use strict';

/** onload **/
$(function(){

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

    if (mode == 'M') {
        getAwardDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            przNm : $('#przNm').val(), 
            przDt : $('#przDt').val(), 
            przOrgNm : $('#przOrgNm').val(), 
            etcNm : $('#etcNm').val()
        };

        if (mode == 'W') {
            registerAward(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerAward(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
    });

});

/**
 * 대내외 수상경력 등록 함수
 * @param {string} params.przNm 포상명
 * @param {string} params.przDt 포상일자
 * @param {string} params.przOrgNm 포상기관
 * @param {string} params.etcNm 기타
 * @param {number} params.seqNo 일련번호
 */
var registerAward = function(params, pathname){
    if(isValid(params)){
        ajaxCall({
            method : 'POST', 
            url : '/employee/awardWrite', 
            data : params, 
            success: openPopup({
                title: '성공',
                text: '대내외 수상경력 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/'+pathname+'/index';
                }
            })
        });
    }
}

/**
 * 대내외 수상경력 상세조회
 * @param {number} seqNo 일련번호
 */
var getAwardDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/awardDetail/' + seqNo, 
        success : function(award){
            fillInputValue(award);
        }
    });
}

/**
 * 유효성검사
 * @param {object} params 포상정보
 * @returns boolean
 */
var isValid = function(params){
    let flag = false;

    if(isEmpty(params.przNm)){
        openPopup({
            title: '실패',
            text: '포상명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#przNm').focus();
                });
            }
        });
    } else if(dateValidation(params.przDt) == false || params.przDt != 8){
        openPopup({
            title: '실패',
            text: '포상일자를 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#przDt').focus();
                });
            }
        });
    } else if(isEmpty(params.przOrgNm)){
        openPopup({
            title: '실패',
            text: '포상기관을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#przOrgNm').focus();
                });
            }
        });
    } else {
        flag = true;
    }

    return flag;
}