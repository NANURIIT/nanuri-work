/** certificate_add **/
'use strict';

/** onload **/
$(function () {

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

    getCommonCode();

    if (mode == 'M') {
        getCertificateDetail(seqNo);
    }

    // 저장 버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            qlfcDsCd: $('#qlfcDsCd').val(),
            qlfcNm: $('#qlfcNm').val(),
            pbcplNm: $('#pbcplNm').val(),
            acqDt: $('#acqDt').val(),
            vldDt: $('#vldDt').val(),
            updtDt: $('#updtDt').val()
        }

        if (mode == 'W') {
            registerCertificate(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerCertificate(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
    });
});

/**
 * 공톧코드 호출
 */
var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        async : false, 
        data: { dsCd: 'CERTIFICATE' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }

            $('#qlfcDsCd').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 자격증 입력 함수
 * @param {string} params.qlfcDsCd  자격증 구분 코드   
 * @param {string} params.qlfcNm    자격증명
 * @param {string} params.pbcplNm   발행처
 * @param {string} params.acqDt     취득일자
 * @param {string} params.vldDt     유효일자
 * @param {string} params.updtDt    갱신일자
 */
var registerCertificate = function (params, pathname) {
    if(isValid(params)){
        ajaxCall({
            method: 'POST',
            url: '/employee/certificateWrite',
            data: params,
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '자격증 등록에 성공했습니다.',
                        type: 'success',
                        callback: function () {
                            location.href = '/'+pathname+'/index';
                        }
                    })
                } else {
                    openPopup({
                        title: '실패',
                        text: message,
                        type: 'error'
                    })
                }
            }
        });
    }
}

/**
 * 자격증 상세 조회
 * @param {number} seqNo 일련번호
 */
var getCertificateDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/certificateDetail/'+seqNo, 
        success : function(cerfiticate){
            fillInputValue(cerfiticate);
        }
    });
}

/**
 * 유효성검사
 * @param {object} params 자격증정보
 * @returns boolean
 */
var isValid = function(params){
    let flag = false;

    if (isEmpty(params.qlfcNm)) {
        openPopup({
            title: '실패',
            text: '자격증명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#qlfcNm').focus();
                });
            }
        });
    } else if (isEmpty(params.pbcplNm)) {
        openPopup({
            title: '실패',
            text: '발행처를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#pbcplNm').focus();
                });
            }
        });
    } else if (dateValidation(params.acqDt) == false || params.acqDt.length != 8) {
        openPopup({
            title: '실패',
            text: '취득일자를 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#acqDt').focus();
                });
            }
        });
    } else if (dateValidation(params.vldDt) == false || params.vldDt.length != 8) {
        openPopup({
            title: '실패',
            text: '유효일자를 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#vldDt').focus();
                });
            }
        });
    } else if (isEmpty(params.updtDt) == false && (dateValidation(params.updtDt) == false || params.updtDt.length != 8)) {
        openPopup({
            title: '실패',
            text: '갱신일자를 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#updtDt').focus();
                });
            }
        });
    } else {
        flag = true;
    }

    return flag;
}