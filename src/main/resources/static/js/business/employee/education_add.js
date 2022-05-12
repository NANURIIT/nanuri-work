/** education_add **/
'use strict';

/** onload **/
$(function () {

    let pageInfo = getPageInfo();

    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

    getCommonCode();

    if (mode == 'M') {
        getSchoolCareerDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            sccaDsCd: $('#sccaDsCd').val(),
            majrNm: $('#majrNm').val(),
            schlNm: $('#schlNm').val(),
            etisYm: $('#etisYm').val(),
            grduYm: $('#grduYm').val()
        };

        if (mode == 'W') {
            registerSchoolCareer(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerSchoolCareer(params, pathname);
        }
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
        data: { dsCd: 'SCHOOLCAREER' },
        async: false,
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#sccaDsCd').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 학력등록
 * @param {string} params.sccaDsCd 학력구분코드
 * @param {string} params.majrNm   전공
 * @param {string} params.schlNm   학교명
 * @param {string} params.etisYm   입학년월
 * @param {string} params.grduYm   졸업년월
 */
var registerSchoolCareer = function (params, pathname) {

    if (isEmpty(params.schlNm)) {
        openPopup({
            title: '실패',
            text: '학교명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#schoolName').focus();
                });
            }
        });
    } else if (dateValidation(params.etisYm) == false) {
        openPopup({
            title: '실패',
            text: '입학년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#etisYm').focus();
                });
            }
        });
    } else if (dateValidation(params.grduYm) == false) {
        openPopup({
            title: '실패',
            text: '졸업년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#grduYm').focus();
                });
            }
        });
    } else if (params.sccaDsCd != 'HIGHSCHOOL' && isEmpty(params.majrNm)) {
        openPopup({
            title: '실패',
            text: '전공을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#majrNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method: 'POST',
            url: '/employee/schoolCareerWrite',
            data: params,
            success: openPopup({
                title: '성공',
                text: '학력 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/' + pathname + '/index';
                }
            })
        });
    }
}

/**
 * 학력 상세 조회
 * @param {number} seqNo 일련번호
 */
var getSchoolCareerDetail = function (seqNo) {
    ajaxCall({
        method: 'GET',
        url: '/employee/schoolCareerDetail/' + seqNo,
        success: function (schoolCareer) {
            fillValue(schoolCareer);
        }
    });
}