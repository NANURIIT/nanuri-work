/** workhistory_add **/
'use strict';

/** onload **/
$(function () {

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

    if (mode == 'M') {
        getWorkhistoryDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            wrkplNm: $('#wrkplNm').val(),
            encoYm: $('#encoYm').val(),
            rtrmYm: $('#rtrmYm').val(),
            dtyNm: $('#dtyNm').val(),
            chrgBsnNm: $('#chrgBsnNm').val()
        }

        if (mode == 'W') {
            registerWorkhistory(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerWorkhistory(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
    });
});

/**
 * 회사소속이력 등록
 * @param {string} params.wrkplNm 근무처
 * @param {string} params.encoYm 입사년월
 * @param {string} params.rtrmYm 퇴사년월
 * @param {string} params.dtyNm 직책
 * @param {string} params.chrgBsnNm 담당업무
 * @param {string} params.seqNo 일련번호
 * @param {string} pathname admin or mobile
 */
var registerWorkhistory = function (params, pathname) {
    if(isValid(params)){
        ajaxCall({
            method: 'POST',
            url: '/employee/workhistoryWrite',
            data: params,
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '회사소속이력 등록에 성공했습니다.',
                        type: 'success',
                        callback: function () {
                            location.href = '/' + pathname + '/index';
                        }
                    });
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
 * 회사소속이력 상세 조회
 * @param {number} seqNo 일련번호
 */
var getWorkhistoryDetail = function (seqNo) {
    ajaxCall({
        method: 'GET',
        url: '/employee/workhistoryDetail/' + seqNo,
        success: function (workHistory) {
            fillInputValue(workHistory);
        }
    })
}

/**
 * 유효성검사
 * @param {object} params 회사소속이력 정보
 * @returns boolean
 */
var isValid = function(params){
    let flag = false;

    if (isEmpty(params.wrkplNm)) {
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
    } else if (dateValidation(params.encoYm) == false || params.encoYm.length != 6) {
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
    } else if (dateValidation(params.rtrmYm) == false || params.rtrmYm.length != 6) {
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
    } else if (isEmpty(params.dtyNm)) {
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
    } else if (isEmpty(params.chrgBsnNm)) {
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
        flag = true;
    }

    return flag;
}