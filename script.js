function validateAndGetFormData() {
    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") {
        alert("Roll No is a Required Value");
        $("#rollNo").focus();
        return "";
    }
    var fullNameVar = $("#fullName").val();
    if (fullNameVar === "") {
        alert("Full Name is a Required Value");
        $("#fullName").focus();
        return "";
    }
    var classVar = $("#class").val();
    if (classVar === "") {
        alert("Class is a Required Value");
        $("#class").focus();
        return "";
    }

    var birthDateVar = $("#birthDate").val();
    if (birthDateVar === "") {
        alert("Birth Date is a Required Value");
        $("#birthDate").focus();
        return "";
    }

    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Address is a Required Value");
        $("#address").focus();
        return "";
    }

    var enrollmentDateVar = $("#enrollmentDate").val();
    if (enrollmentDateVar === "") {
        alert("Enrollment Date is a Required Value");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function getRollNoAsJsonObj() {
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        id: rollNo
    };
    return JSON.stringify(jsonStr);
}

function getStudent() {
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(
        connToken,
        stuDBName,
        stuRelationName,
        rollNoJsonObj
    );
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(
        getRequest,
        jpdbBaseURL,
        jpdbURL
    );
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status === 400) {
        $("#saveButton").prop("disabled", false);
        $("#resetButton").prop("disabled", false);
        $("#fullName").focus();
    } else if (resJsonObj.status === 200) {
        $("#rollNo").prop("disabled", true);
        fillData(resJsonObj);
        $("#updateButton").prop("disabled", false);
        $("#resetButton").prop("disabled", false);
        $("#fullName").focus();
    }
}

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#rollNo").focus();
}

function changeData() {
    $("#updateButton").prop("disabled", true);
    var jsonChg = validateAndGetFormData();
    if (jsonChg === "") {
        return;
    }
    var updateRequest = createUPDATERecordRequest(
        connToken,
        jsonChg,
        stuDBName,
        stuRelationName,
        localStorage.getItem("recno")
    );
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(
        updateRequest,
        jpdbBaseURL,
        jpdbIML
    );
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $("#rollNo").focus();
}

function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(
        "90934467|-31949229594145745|90957043",
        jsonStr,
        "SCHOOL-DB",
        "STUDENT-TABLE"
    );

    alert(putReqStr);

    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(
        putReqStr,
        "http://api.login2explore.com:5577",
        "/api/iml"
    );
    jQuery.ajaxSetup({ async: true });

    alert(JSON.stringify(resultObj));
    resetForm();
}
