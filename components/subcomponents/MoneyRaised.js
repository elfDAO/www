import { MILESTONES } from "@components/Progress";

const MoneyRaised = ({ eth, dollarGoal, dollars, conversionRate }) => {
    const ethGoal = (dollarGoal / conversionRate).toFixed(2)
    const ethGoalFallback = 259.96;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="raised">
            {/* DOLLARS */}
            <p className="count first">

                <span className="dollars">${numberWithCommas(dollars.toFixed(2))}</span><span className="dollarGoal"></span>
            </p>
            {/* ETH */}
            <p className="count">
                <span className="eth">Ξ{eth}</span><span className="ethGoal">
                    {/* / Ξ{ethGoal ? ethGoal : ethGoalFallback} */}
                </span>
            </p>
            {/* <p className="count secondary">Next goal: ${MILESTONES[MILESTONES.indexOf(dollarGoal) + 1].toFixed(0)} / Ξ{(MILESTONES[MILESTONES.indexOf(dollarGoal) + 1] / conversionRate).toFixed(2)}</p> */}
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
                    font-size: 2.5rem;
                    text-align: center;
                } .count.first {
                    font-size:3.5rem;
                }

                .count.secondary {
                    font-size: 1.5rem;
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
                @media only screen and (max-width: 36rem) {
                    .raised {
                        margin-bottom: 1.5rem;
                    }

                    .count {
                        font-weight: bold;
                        font-size: 2rem;
                        text-align: center;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default MoneyRaised