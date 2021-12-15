import React from 'react';
import {Calendar,Select, Radio, Col, Row, Typography } from 'antd'
import 'antd/dist/antd.min.css';


export default function EventCalendar() {
    function onPanelChange(value, mode) {
        console.log(value, mode);
    }
    const onSelect = (date) => {
        console.log(date)
    }

    // const present = [''];
    const renderCell = (dateOb) => {
        const date = dateOb.toDate().getDate();
        const month = dateOb.toDate().getMonth();
        const year = dateOb.toDate().getFullYear();
        const todayDate = new Date();
        // console.log(date, month, todayDate)
        if (date === todayDate.getDate() && month === todayDate.getMonth() && year === todayDate.getFullYear()) {
            return <div>&#x2611;</div>
        } 
        return <div className="present-tick-mark">
            {date % 3 === 0 ? <span className="fullday">&#10003;</span> : <span className="halfday">&#10003;</span>}
        </div>
    }

    return (
        <div>
            <Calendar
                onSelect={onSelect}
                fullscreen={false}
                dateCellRender={renderCell}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current.month(i);
                        months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                        monthOptions.push(
                            <Select.Option className="month-item" key={`${index}`}>{months[index]}</Select.Option>,
                        );
                    }
                    const month = value.month();

                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option key={i} value={i} className="year-item">{i}</Select.Option>,
                        );
                    }
                    return (
                        <div style={{ padding: 8 }}>
                            <Typography.Title level={4}>Custom header</Typography.Title>
                            <Row gutter={8}>
                                <Col>
                                    <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                                    <Radio.Button value="month">Month</Radio.Button>
                                    <Radio.Button value="year">Year</Radio.Button>
                                    </Radio.Group>
                                </Col>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        className="my-year-select"
                                        onChange={newYear => {
                                            const now = value.clone().year(newYear);
                                            onChange(now);
                                        }}
                                        value={String(year)}
                                        >
                                        {options}
                                    </Select>
                                </Col>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        value={String(month)}
                                        onChange={selectedMonth => {
                                            const newValue = value.clone();
                                            newValue.month(parseInt(selectedMonth, 10));
                                            onChange(newValue);
                                        }}
                                        >
                                        {monthOptions}
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    );
                }
            }
            onPanelChange={onPanelChange}
            />
        </div>
    )
}