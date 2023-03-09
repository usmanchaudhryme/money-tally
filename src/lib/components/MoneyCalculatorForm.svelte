<script>
	import Decimal from 'decimal.js';
	import { isValidMoneyValue } from '../utils/validators';
	import NotificationMessage from './NotificationMessage.svelte';

	let fields = [''];
	let showNotification = false;

	// a cleaner way to calculate this value is to use the reactivity magic by svelte
	// this way you don't need to manually set the value
	$: sum = getFormattedLocaleValue(
		fields
			.reduce((acc, val) => {
				return acc.add(new Decimal(Number(getFormattedLocaleValue(val))));
			}, new Decimal(0.0))
			.toString(),
		'de'
	);

	/**
	 * @param {Event & { currentTarget: HTMLInputElement; }} event
	 * @param {number} index
	 */
	function handleInput(event, index) {
		fields[index] = event.currentTarget.value;
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

		// i would escape all special keyboard codes
		// that way Ctrl + R or Tab + Shift also work as expected

		if (!isValidMoneyValue(`${value}${keyMap[event.key] || event.key}`)) {
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
</script>

<div class="container">
	{#each fields as _, index}
		<div class="row">
			<input
				id={`input_${index}`}
				on:keydown={handleKeyDown}
				on:input={(event) => handleInput(event, index)}
			/>
		</div>
	{/each}
	<div class="row result">
		<!-- the bind: is unnecessary because it's just a one way data stream -->
		SUM: <input id="sum" value={sum} disabled />
	</div>
</div>
{#if showNotification}
	<NotificationMessage>
		<!-- it's better to pass it as a slot into the <NotificationMessage> component -->
		<!-- than hard code the html into a template string -->
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
	</NotificationMessage>
{/if}

<style>
	/* there must be a better way to center a div :) */
	.container {
		display: flex;
		flex-direction: column;
		place-items: center;
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
