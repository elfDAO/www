const MoneyRaised = ({ eth, dollarGoal, dollars, conversionRate }) => {
    const ethGoal = (dollarGoal / conversionRate).toFixed(2)

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="raised">
            {/* DOLLARS */}
            <p className="count first">
            <span className="dollars">${numberWithCommas(dollars)}</span><span className="dollarGoal"> / ${numberWithCommas(dollarGoal)}</span>
            </p>
            {/* ETH */}
            <p className="count">
            <span className="eth">Ξ{eth}</span><span className="ethGoal"> / Ξ{ethGoal}</span>
            </p>
            <style jsx>
                {`

                .raised {
                    margin-bottom: 2rem;
                }

                .first {
                    margin-bottom: .25rem;
                }
                .count {
                    font-weight: bold;
                    font-size: 3.5rem;
                    text-align: center;
                }

                .dollars {
                    color: #36ECAC;
                }

                .dollarGoal {
                    color: #236357;
                }

                .eth {
                    color: #00FFFF;
                }

                .ethGoal {
                    color: #46B4B4;
                }

                `}
            </style>
        </div>
    )
}

export default MoneyRaised