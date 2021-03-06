/** language_add **/
'use strict';

/** onload **/
$(function(){

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

    if (mode == 'M') {
        getLanguageDetail(seqNo);
    }
    
    // 저장버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            frgnNm : $('#frgnNm').val(), 
            prfcnNm : $('#prfcnNm').val(), 
            etcNm : $('#etcNm').val()
        };

        if (mode == 'W') {
            registerLanguage(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerLanguage(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
    });
});

/**
 * 외국어능력 등록
 * @param {string} params.frgnNm 외국어
 * @param {string} params.prfcnNm 숙련도
 * @param {string} params.etcNm 기타
 * @param {string} params.seqNo 일련번호
 * @param {string} pathname pc, mobile구분자 -> admin or mobile
 */
var registerLanguage = function(params, pathname){
    if(isValid(params)){
        ajaxCall({
            method: 'POST',
            url: '/employee/languageWrite',
            data: params,
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '외국어 능력 등록에 성공했습니다.',
                        type: 'success',
                        callback: function () {
                            location.href = '/'+pathname+'/index';
                        }
                    })
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

/**
 * 외국어능력 상세 조회
 * @param {number} seqNo 일련번호
 */
var getLanguageDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/languageDetail/'+seqNo, 
        success : function(languageSkill){
            fillInputValue(languageSkill);
        }
    });
}

/**
 * 유효성검사
 * @param {object} params 외국어 능력
 * @returns boolean
 */
var isValid = function(params){
    let flag = false;

    if(isEmpty(params.frgnNm)){
        openPopup({
            title: '실패',
            text: '언어를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#frgnNm').focus();
                });
            }
        });
    } else if(isEmpty(params.prfcnNm)){
        openPopup({
            title: '실패',
            text: '숙련도를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#prfcnNm').focus();
                });
            }
        });
    } else {
        flag = true;
    }

    return flag;
}