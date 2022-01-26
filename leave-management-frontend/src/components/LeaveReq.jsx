const LeaveReq = () => {
  return (
    <div className="leaveReqForm">
      <h1 className="title">Leave Request Form</h1>
      <form>
        <div className="leaveReqElement employee_name">
          <label>Employee Name </label>
          <input type="text" className="inputText"></input>
        </div>
        <div className="leaveReqElement department_type">
          <label>Department </label>
          <br />
          <input type="radio" id="rnd" name="department" value="rnd" />
          <label>R and D</label>
          <br />

          <input
            type="radio"
            id="administration"
            name="department"
            value="administration"
          />
          <label>Administration</label>
          <br />

          <input
            type="radio"
            id="marketing"
            name="department"
            value="marketing"
          />
          <label>Marketing</label>
          <br />
          <input
            type="radio"
            id="artsAndGraphics"
            name="department"
            value="artsAndGraphics"
          />
          <label>Arts and Graphics</label>
          <br />
          <input type="radio" id="others" name="department" value="others" />
          <label>Other</label>
          <br />
        </div>
        <div className="leaveReqElement ">
          <label> Leave Type </label>
          <div className="select">
            <select name="leave_type" id="leave_type" className="leave_type">
              <option value="sick_leave">Sick Leave</option>
              <option value="annual_leave">Annual Leave</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="leaveReqElement duration">
          <label>Duration </label>
          <input type="text" className="inputText"></input>
        </div>
        <div className="leaveReqElement remarks">
          <label> Remarks</label>
          <textarea name="remarks"></textarea>
        </div>
        <div className="leaveReqElement leaveReqForm_button">
          <button className="btn_leaveReq">Request Leave</button>
          <button className="btn_cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveReq;
