/** employee_add **/
'use strict';

/** onload **/
$(function () {

    let pageInfo = getPageInfo();
    
    let pathname = pageInfo.pathname;
    let mode = isEmpty(localStorage) ? 'W' : 'M';
    getCommonCode();

    if(mode == 'M'){
        let params = {
            userNm : JSON.parse(localStorage.getItem('userInfo')).userNm, 
            telNo : JSON.parse(localStorage.getItem('userInfo')).telNo
        };

        getEmployeeDetail(params);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function () {
        let param = {
            blgDsCd: $('#blgDsCd').val(),
            blgNm: $('#blgNm').val(),
            zip: $('#zip').val(),
            addr: $('#addr').val(),
            userNm: $('#userNm').val(),
            encoDt: $('#encoDt').val(),
            rtrmDt: $('#rtrmDt').val(),
            blgDsChgDt: $('#blgDsChgDt').val(),
            dtyNm: $('#dtyNm').val(),
            telNo: $('#telNo').val(),
            rrno: $('#rrno').val(),
            dutNm: $('#dutNm').val(),
            emailAddr: $('#emailAddr').val()
        }
        
        if(mode == 'W'){
            registerEmployee(param, pathname);
        } else if(mode == 'M'){
            updateEmployee(param, pathname);
        }
    });

    // 취소버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        history.go(-1);
    });
});

/**
 * 공통코드 호출
 */
var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'BELONG' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#blgDsCd').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 신규 직원 등록
 * @param {string} param.blgDsCd 소속구분
 * @param {string} param.blgNm 소속
 * @param {string} param.zip 우편번호
 * @param {string} param.addr 주소
 * @param {string} param.userNm 이름
 * @param {string} param.encoDt 입사일자
 * @param {string} param.rtrmDt 퇴사일자
 * @param {string} param.blgDsChgDt 소속구분변경일자
 * @param {string} param.dtyNm 직급
 * @param {string} param.telNo 전화번호
 * @param {string} param.rrno 주민등록번호
 * @param {string} param.dutNm 직무
 * @param {string} param.emailAddr 이메일
 */
var registerEmployee = function (param, pathname) {
    if(isValid(param)){
        ajaxCall({
            method: 'POST',
            url: '/employee/registerEmployee',
            data: param,
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '신규 직원 등록에 성공했습니다.',
                        type: 'success',
                        callback: function () {
                            location.href = '/' + pathname + '/employeeList'
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

/**
 * 직원정보 호출
 * @param {string} params.userNm 이름
 * @param {string} params.telNo 전화번호
 */
var getEmployeeDetail = function(params){
    console.log(params);
    ajaxCall({
        method : 'GET', 
        url : '/employee/getEmployeeDetail', 
        data : params, 
        success : function(employee){
            fillInputValue(employee);
        }
    })
}

/**
 * 직원정보 수정
 * @param {object} param 직원정보
 * @param {string} pathname admin or mobile 
 */
var updateEmployee = function(param, pathname){
    if(isValid(param)){
        ajaxCall({
            method: 'PATCH',
            url: '/employee/updateEmployee',
            data: param,
            success: function(message){
                if(isEmpty(message)){
                    openPopup({
                        title: '성공',
                        text: '직원 정보 수정에 성공했습니다.',
                        type: 'success',
                        callback: function () {
                            location.href = '/' + pathname + '/employeeList'
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

var isValid = function(param){
    let regBirth = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
    let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    let flag = false;
    if (isEmpty(param.blgDsCd)) {
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
    } else if (isEmpty(param.blgNm)) {
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
    } else if (isEmpty(param.zip)) {
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
    } else if (isEmpty(param.addr)) {
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
    } else if (isEmpty(param.userNm)) {
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
    } else if (dateValidation(param.encoDt) || param.encoDt.length != 8) {
        openPopup({
            title: '실패',
            text: '입사일자를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#encoDt').focus();
                });
            }
        });
    } else if (isEmpty(param.dtyNm)) {
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
    } else if (isEmpty(param.telNo)) {
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
    } else if (param.rrno.length != 7) {
        openPopup({
            title: '실패',
            text: '주민등록번호는 7자리를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#rrno').focus();
                });
            }
        });
    } else if (regBirth.test(param.rrno.substring(0, 6)) == false) {
        openPopup({
            title: '실패',
            text: '주민등록번호 앞7자리를 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#rrno').focus();
                });
            }
        });
    } else if (isEmpty(param.dutNm)) {
        openPopup({
            title: '실패',
            text: '직무를 입력해주세요',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#dutNm').focus();
                });
            }
        });
    } else if (regEmail.test(param.emailAddr) == false) {
        openPopup({
            title: '실패',
            text: '이메일을 확인해주세요',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#emailAddr').focus();
                });
            }
        });
    } else {
        flag = true;
    }

    return flag;
}