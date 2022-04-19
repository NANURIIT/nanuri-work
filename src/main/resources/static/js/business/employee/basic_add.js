/** basic_add **/
'use strict';

/** onload **/
$(function () {

    let uri = new URL(document.location.href).pathname;
    let pathname = uri.split('/')[1];

    getCommonCode();

    // 저장 버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            blgDsCd: $('#blgDsCd').val(),
            blgNm: $('#blgNm').val(),
            zip: $('#zip').val(),
            addr: $('#addr').val(),
            userNm: $('#userNm').val(),
            dtyNm: $('#dtyNm').val(),
            telNo: $('#telNo').val(),
            rrno: $('#rrno').val(),
            dutNm: $('#dutNm').val(),
            emailAddr: $('#emailAddr').val()
        }

        registerBasicInfo(params, pathname);
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        goToIndex(pathname);
    });
});

/**
 * 공통코드 호출
 */
var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'belong' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#blgDsCd').html(COMMON_CODE_HTML);
            getBasicInfoDetail();
        }
    });
}

/**
 * 기본정보 호출
 */
var getBasicInfoDetail = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/basicInfoDetail',
        success: function (object) {
            $('#blgDsCd').val(object.blgDsCd).prop('selected', true);
            $('#blgNm').val(object.blgNm);
            $('#zip').val(object.zip);
            $('#addr').val(object.addr);
            $('#userNm').val(object.userNm);
            $('#dtyNm').val(object.dtyNm);
            $('#telNo').val(object.telNo);
            $('#rrno').val(object.rrno);
            $('#dutNm').val(object.dutNm);
            $('#emailAddr').val(object.emailAddr);
        }
    });
}

/**
 * 기본정보 등록
 * @param {string} params.blgDsCd 소속구분
 * @param {string} params.blgNm 소속
 * @param {string} params.zip 우편번호
 * @param {string} params.addr 주소
 * @param {string} params.userNm 이름
 * @param {string} params.dtyNm 직급
 * @param {string} params.telNo 전화번호
 * @param {string} params.rrno 주민등록번호
 * @param {string} params.dutNm 직무
 * @param {string} params.emailAddr 이메일주소
 */
var registerBasicInfo = function (params, pathname) {
    if(isEmpty(params.blgDsCd)){
        openPopup({
            title: '실패',
            text: '소속구분을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#blgDsCd').focus();
                });
            }
        });
    } else if(isEmpty(params.blgNm)){
        openPopup({
            title: '실패',
            text: '소속을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#blgNm').focus();
                });
            }
        });
    } else if(isEmpty(params.zip)){
        openPopup({
            title: '실패',
            text: '우편번호를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#zip').focus();
                });
            }
        });
    } else if(isEmpty(params.addr)){
        openPopup({
            title: '실패',
            text: '주소를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#addr').focus();
                });
            }
        });
    } else if(isEmpty(params.userNm)){
        openPopup({
            title: '실패',
            text: '이름을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#userNm').focus();
                });
            }
        });
    } else if(isEmpty(params.dtyNm)){
        openPopup({
            title: '실패',
            text: '직급을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#dtyNm').focus();
                });
            }
        });
    } else if(isEmpty(params.telNo)){
        openPopup({
            title: '실패',
            text: '전화번호를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#telNo').focus();
                });
            }
        });
    } else if(isEmpty(params.rrno)){
        openPopup({
            title: '실패',
            text: '주민등록번호를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#rrno').focus();
                });
            }
        });
    } else if(isEmpty(params.dutNm)){
        openPopup({
            title: '실패',
            text: '직무를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#dutNm').focus();
                });
            }
        });
    } else if(isEmpty(params.emailAddr)){
        openPopup({
            title: '실패',
            text: '이메일을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#emailAddr').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method: 'POST',
            url: '/employee/basicInfoUpdate',
            data: params,
            success: openPopup({
                title: '성공',
                text: '기본정보 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/'+pathname+'/index';
                }
            })
        });
    }
}