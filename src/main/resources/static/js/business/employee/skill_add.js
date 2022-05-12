/** skill_add **/
'use strict';

/** onload **/
$(function () {

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

    if (mode == 'M') {
        getSkillDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            langFeldNm : $('#langFeldNm').val(), 
            prfcnNm : $('#prfcnNm').val(), 
            etcNm : $('#etcNm').val()
        };

        if (mode == 'W') {
            registerSkill(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerSkill(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
    });
});

/**
 * 
 * @param {string} params.langFeldNm 사용가능기술(언어)
 * @param {string} params.prfcnNm 숙련도
 * @param {string} params.etcNm 기타
 * @param {number} params.seqNo 일련번호
 */
var registerSkill = function (params, pathname) {
    if(isValid(params)){
        ajaxCall({
            method: 'POST',
            url: '/employee/skillWrite',
            data: params,
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '사용가능기술(언어) 등록에 성공했습니다.',
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
                    })
                }
            }
        });
    }
}

/**
 * 사용가능기술(언어) 상세 조회
 * @param {number} seqNo 일련번호
 */
var getSkillDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/skillDetail/'+seqNo, 
        success : function(skill){
            fillInputValue(skill);
        }
    });
}

/**
 * 유효성검사
 * @param {object} params 사용가능기술 정보
 * @returns boolean
 */
var isValid = function(params){
    let flag = false;

    if (isEmpty(params.langFeldNm)) {
        openPopup({
            title: '실패',
            text: '사용가능기술(언어)를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#langFeldNm').focus();
                });
            }
        });
    } else if (isEmpty(params.prfcnNm)) {
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