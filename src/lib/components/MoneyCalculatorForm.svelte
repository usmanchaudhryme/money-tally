<script>
	import Decimal from 'decimal.js';
	import { isValidMoneyValue } from '../utils/validators';
	import NotificationMessage from './NotificationMessage.svelte';

	let fields = [''];
	let sum = '0';
	let showNotification = false;

	/**
	 * @param {Event & { currentTarget: HTMLInputElement; }} event
	 * @param {number} index
	 */
	function handleInput(event, index) {
		fields[index] = event.currentTarget.value;
		calculateSum();
		if (fields[index] && index === fields.length - 1) {
			fields = [...fields, ''];
		}
	}

	/**
	 * @param {KeyboardEvent & { currentTarget: HTMLInputElement } } event
	 */
	function handleKeyDown(event) {
		const value = event.currentTarget.value;
		/**
		 * @type {{[key: string]: string}}
		 */
		const keyMap = {
			Backspace: '\b',
			Tab: '\t',
			Delete: '\x08',
			Shift: '\x7f',
			ArrowLeft: '\u2190',
			ArrowRight: '\u2192'
		};

		if (isValidMoneyValue(`${value}${keyMap[event.key] || event.key}`)) {
			event.preventDefault();
			showNotification = true;
		}
	}

	/**
	 * @param {string} value
	 */
	function getFormattedLocaleValue(value, locale = 'en') {
		return locale === 'en' ? value.replace(',', '.') : value.replace('.', ',');
	}

	function calculateSum() {
		sum = getFormattedLocaleValue(
			fields
				.reduce((acc, val) => {
					return acc.add(new Decimal(Number(getFormattedLocaleValue(val))));
				}, new Decimal(0.0))
				.toString(),
			'de'
		);
	}

	const notificationMessage = `
	<h3>Value Suggestion</h3>
	<p>We've blocked one or more invalid money value</p>
	<p>Valid Examples:</p>
	<ul>
		<li>12,20</li>
		<li>1,00</li>
		<li>21</li>		
	</ul>

	<p>Invalid Examples:</p>
	<ul>
		<li>123,234</li>
		<li>abc</li>
		<li>002</li>		
	</ul>
	`;
</script>

<div class="container">
	{#each fields as _, index}
		<div class="row">
			<input on:keydown={handleKeyDown} on:input={(event) => handleInput(event, index)} />
		</div>
	{/each}
	<div class="row result">
		SUM: <input bind:value={sum} disabled />
	</div>
</div>
<NotificationMessage message={notificationMessage} bind:visible={showNotification} />

<style>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		justify-content: center;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-58%);
	}
	.row {
		border: 2px solid darkgray;
		width: 296px;
		display: flex;
		justify-content: flex-end;
		padding-left: 2rem;
	}
	.row.result {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.5rem;
	}
	.row:not(:first-child) {
		border-top: none;
	}
	input {
		margin: 1rem;
		text-align: right;
		padding-right: 0.5rem;
		width: 180px;
		height: 2rem;
		font-size: 1.5rem;
		font-weight: 400;
		border: 2px solid darkgray;
	}
	input:disabled {
		border: 2px solid lightgray;
	}
</style>
