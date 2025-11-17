import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние страницы - применяется сразу через CSS переменные
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояние формы - временное, пока не нажата кнопка "Применить"
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Функция для применения состояния из формы
	const applyFormState = (state: ArticleStateType) => {
		setArticleState(state);
	};

	// Функция для сброса к состоянию по умолчанию
	const resetFormState = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={setFormState}
				applyFormState={() => applyFormState(formState)}
				resetFormState={resetFormState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
