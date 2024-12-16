import styles from './app.module.css'
import data from './data.json'
import { useState } from 'react'

export const App = () => {
	const [steps, setSteps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	const onClickBack = () => {
		setActiveIndex(activeIndex - 1)
	}
	const onClickNext = () => {
		setActiveIndex(activeIndex + 1)
	}
	const onClickReset = () => {
		setActiveIndex(0)
	}

	const stepClassName = (currentIndex) => {
		if (activeIndex > currentIndex) {
			return styles.done + ' ' + styles['steps-item']
		} else if (activeIndex === currentIndex) {
			return (
				styles.done + ' ' + styles.active + ' ' + styles['steps-item']
			)
		} else {
			return styles['steps-item']
		}
	}

	const isFirstStep = activeIndex === 0
	const isLastStep = activeIndex === steps.length - 1

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li className={stepClassName(index)} key={step.id}>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{Number(step.id)}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onClickBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? onClickReset : onClickNext}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
