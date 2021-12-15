import React from 'react';

const Providers = ({data, error, loading}) => {
    
    if(loading) {
        return <h3>Lodaing Providers...</h3>
    }
    if (error) {
        return <p>Error: Can't Load providers</p>
    }
    console.log('rendering providers compoennt')
    return (
        <div style={{width: 550}}>
            <div style={{display: 'grid', gridTemplateColumns: '150px auto', gap: 10}}>
                <div>Name</div>
                <div style={{display: 'grid', gridTemplateColumns: 'auto 100px'}}>
                    <div>No of Days</div>
                    <div>Wage</div>
                </div>
            </div>
            {
                data.providers.filter(p=>p.type !== 'vendor').map((provider)=><ProviderItem provider={provider}/>)
            }
        </div>
    )
}

// export default React.memo(Providers)
export default Providers;

const ProviderItem = ({provider}) => <div style={{display: 'grid', gridTemplateColumns: '150px auto', gap: 10}}>
    <div>{provider.name}</div>
    <ProviderWageAggregation workerInvoice={provider.workerInvoice} />
</div>

const ProviderWageAggregation = ({workerInvoice}) => {
    const { noOfDays, totalWage } = getAggregatedData(workerInvoice);
    return <div style={{display: 'grid', gridTemplateColumns: 'auto 100px'}}>
        <div>{noOfDays}</div>
        <div>&#8377; {totalWage}</div>
    </div>
}

function getAggregatedData(workerInvoice) {
    let noOfDays = 0;
    let totalWage = 0;
    workerInvoice.forEach(invoice => {
        noOfDays+= invoice.halfDay === true ? 0.5 : 1;
        totalWage+= invoice.halfDay === true ? invoice.wage/2 : invoice.wage;
    });

    return {
        noOfDays,
        totalWage
    }

}