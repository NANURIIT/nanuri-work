/** certificate_add **/
'use strict';

/** onload **/
$(function () {

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

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
            registerCertificate(params);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerCertificate(params);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function(){
        location.href = '/mobile/employeeInfo';
    });
});

/**
 * 공톧코드 호출
 */
var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'certificate' },
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
var registerCertificate = function (params) {
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
    } else if (isEmpty(params.acqDt) || dateValidation(params.acqDt) == false) {
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
    } else if (isEmpty(params.vldDt) || dateValidation(params.vldDt) == false) {
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
    } else if (isEmpty(params.updtDt) == false && dateValidation(params.updtDt) == false) {
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
        ajaxCall({
            method: 'POST',
            url: '/employee/certificateWrite',
            data: params,
            success: openPopup({
                title: '성공',
                text: '자격증 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/employee/index';
                }
            })
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
        success : function(object){
            $('#qlfcDsCd').val(object.qlfcDsCd);
            $('#qlfcNm').val(object.qlfcNm);
            $('#pbcplNm').val(object.pbcplNm);
            $('#acqDt').val(object.acqDt);
            $('#vldDt').val(object.vldDt);
            $('#updtDt').val(object.updtDt);
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